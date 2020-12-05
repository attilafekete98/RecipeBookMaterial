import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(
      () => this.notificationService.openSuccess('Fetch successful', 'Close', 2500),
      () => this.notificationService.openError('Fetch unsuccessful', 'Close', 2500)
    );
  }

}
