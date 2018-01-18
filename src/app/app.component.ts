import {  AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {MDCPersistentDrawer,MDCTemporaryDrawer} from '@material/drawer';
declare var mdc: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') drawerEl: ElementRef;
  title = 'app';
  drawer: any;
  ngAfterViewInit(): void {
    debugger;
        const MDCTemporaryDrawer = mdc.drawer.MDCTemporaryDrawer;
        this.drawer = new MDCTemporaryDrawer(this.drawerEl.nativeElement);
        this.drawerEl.nativeElement.addEventListener('mdc-temporary-drawer:open', function() {
          console.log('Received MDCPersistentDrawer:open');
        });
        this.drawerEl.nativeElement.addEventListener('mdc-temporary-drawer:close', function() {
          console.log('Received MDCPersistentDrawer:close');
        });
  }

  toggle() {
    this.drawer.open = !this.drawer.open;
  }
}
