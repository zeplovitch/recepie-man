import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recepie } from './rec-builder/Recepie';
import { Equipment } from './rec-builder/equipment/equipments';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) {}

  getRecepieList() {
    return this.http
      .get<[{ title: string; _id: string }]>(
        environment.urlBase + 'recepieList'
      )
      .pipe(
        map(data => {
          const recepieList: { id: string; title: string }[] = [];
          data.forEach(element => {
            recepieList.push({ id: element._id, title: element.title });
          });
          return [...recepieList];
        })
      );
  }
  getRecepie(id: string) {
    return this.http.get<Recepie>(environment.urlBase + 'recepie/' + id);
  }
  getAssets() {
    return this.http
      .get<[{ _id: string; name: string }]>(environment.urlBase + 'assets')
      .pipe(
        map(data => {
          const equipment: Equipment[] = [];
          data.forEach(element => {
            equipment.push({
              name: element.name,
              isSelected: false,
              qty: null
            });
          });
          return [...equipment];
        })
      );
  }

  finish(recepie: Recepie, equipment: Equipment[]): Observable<any> {
    const selectedEquipment = equipment
      .filter(e => e.isSelected === true)
      .map(r => {
        {
          return { name: r.name, qty: r.qty };
        }
      });

    const stepsNoBinary = [];
    const binaries: File[] = [];

    recepie.steps.forEach(s => {
      if (s.description) {
        const images: string[] = [];
        s.uploader.forEach(q => {
          images.push(q.name);
          binaries.push(q);
        });
        stepsNoBinary.push({
          number: s.number,
          description: s.description,
          instructions: s.instructions,
          images
        });
      }
    });

    const postData = new FormData();
    postData.append('title', recepie.title);
    postData.append('steps', JSON.stringify(stepsNoBinary));
    postData.append('equipment', JSON.stringify(selectedEquipment));
    binaries.forEach(binaryImage => {
      postData.append('image', binaryImage, binaryImage.name);
    });
    return this.http.post<{}>(environment.urlFile, postData);
  }
}
