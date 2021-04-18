import { FormDataInterceptorConfig } from '../interfaces/FormDataInterceptorConfig';
import Busboy from 'busboy';
import appendField from 'append-field';
import { BadRequestException } from '@nestjs/common';
import { StoredFile } from './storage/StoredFile';
import { FileSystemStoredFile } from './storage/FileSystemStoredFile';

export class FormReader {
  protected busboy: any;
  protected fileStorePromises: Promise<void>[] = [];

  protected result: any = {};

  private handlePromise: Promise<any>;
  private handlePromiseResolve: Function;
  private handlePromiseReject: Function;

  private files: StoredFile[] = [];


  constructor(protected req: any, protected config: FormDataInterceptorConfig) {
    this.busboy = new Busboy({
      headers: req.headers,
      limits: (config && config.limits) ? config.limits : {},
    });

    this.busboy.on('field', this.proceedField.bind(this));

    this.busboy.on('file', this.proceedFile.bind(this));

    this.busboy.on('error', this.rejectWithError.bind(this));

    this.busboy.on('partsLimit', () => this.rejectWithBadRequest(`Maximum number of parts is ${config.limits.parts}`));
    this.busboy.on('filesLimit', () => this.rejectWithBadRequest(`Maximum number of files is ${config.limits.files}`));
    this.busboy.on('fieldsLimit', () => this.rejectWithBadRequest(`Maximum number of fields is ${config.limits.fields}`));
    this.busboy.on('fileSize', () => this.rejectWithBadRequest(`Maximum file size is ${config.limits.fileSize}`));
    this.busboy.on('finish', this.proceedFinish.bind(this));
  }

  handle(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.handlePromiseReject = reject;
      this.handlePromiseResolve = resolve;
      this.req.pipe(this.busboy);
    });
  }

  async deleteFiles(): Promise<void> {
    await Promise.all(this.files.map(f => f.delete()));
  }

  private proceedField(fieldName: string, value, fieldNameTruncated: boolean, valueTruncated: boolean): void {
    appendField(this.result, fieldName, value);
  }

  private proceedFile(fieldName: string, fileStream: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string): void {

    if (!filename) {
      fileStream.resume();
      return;
    }

    const readFilePromise: Promise<void> = this.loadFile(filename, encoding, mimetype, fileStream)
      .then(f => {
        if ((fileStream as any).truncated) {
          this.busboy.emit('fileSize');
        } else {
          this.files.push(f);
          appendField(this.result, fieldName, f);
        }
      }).catch(err => {
        this.rejectWithError(err);
      });


    this.fileStorePromises.push(readFilePromise);

  }

  private async proceedFinish(): Promise<void> {
    await Promise.all(this.fileStorePromises);
    this.handleDone();
    this.handlePromiseResolve(this.result);
  }

  private rejectWithBadRequest(message: string): void {
    const error = new BadRequestException(null, message);
    this.handlePromiseReject(error);
    this.handleDone();
  }

  private handleDone(): void {
    this.req.unpipe(this.busboy);
    this.busboy.removeAllListeners();
  }

  private rejectWithError(err: any): void {
    this.handlePromiseReject(err);
    this.handleDone();
  }

  private async loadFile(filename: string, encoding: string, mimetype: string, stream: NodeJS.ReadableStream): Promise<StoredFile> {
    return await FileSystemStoredFile.create(filename, encoding, mimetype, stream, this.config);
  }


}