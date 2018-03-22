import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { MatNavList } from "@angular/material";
import { MatSidenav } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("drawer") drawerEl: ElementRef;
  @ViewChild("sidenav") sidenav: MatSidenav;
  title = "app";
  drawer: any;
  constructor(private route: ActivatedRoute) {}
  ngAfterViewInit(): void {
    console.log(this.route.snapshot);
  }

  toggle() {
    this.drawer.open = !this.drawer.open;
  }
  close() {
    this.sidenav.close();
  }
}
