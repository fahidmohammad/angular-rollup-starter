import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import { Observable } from 'rxjs';

const appDir = path.resolve(__dirname, '../../src/app');

export function addModuleIdToComponents(): Observable<any> {
  return new Observable(observer => {
    let srcFiles = glob.sync(`${appDir}/**/*.ts`);
    srcFiles.forEach(srcFile => {
      let contents = fs.readFileSync(srcFile).toString().split('\n');
      let index = contents.findIndex(line => line === '@Component({');
      if (index !== -1) {
        contents[index] = `${contents[index]}\n  moduleId: module.id,`;
        fs.writeFileSync(srcFile, contents.join('\n'), 'utf8');
      }
    });

    observer.complete();
  });
}

export function removeModuleIdFromComponents(): Observable<any> {
  return new Observable(observer => {
    let srcFiles = glob.sync(`${appDir}/**/*.ts`);
    srcFiles.forEach(srcFile => {
      let contents = fs.readFileSync(srcFile).toString().split('\n');
      let index = contents.findIndex(line => line === '  moduleId: module.id,');
      if (index !== -1) {
        contents.splice(index, 1);
        fs.writeFileSync(srcFile, contents.join('\n'), 'utf8');
      }
    });

    observer.complete();
  });
}
