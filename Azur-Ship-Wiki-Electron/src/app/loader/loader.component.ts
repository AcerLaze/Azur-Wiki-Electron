import { Component, OnInit } from '@angular/core';
import { ElectronService } from "ngx-electron";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.on('loadData-reply', (_event: any, message: any) => {
        console.log(message);
      })
      this.electronService.ipcRenderer.send('loadData-message')
    } 
  }

}
