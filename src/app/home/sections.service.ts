import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SectionsService{
    isCollapsed(sectionId: string){
        return Observable.of(false);
    }
}
