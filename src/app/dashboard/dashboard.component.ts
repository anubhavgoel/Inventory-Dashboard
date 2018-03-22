import { Component, OnInit } from "@angular/core";
import { ProductDataServiceService } from "../core/product-data-service.service";
import { FetchRecordService } from "../fetch-record.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: [ProductDataServiceService, FetchRecordService]
})
export class DashboardComponent implements OnInit {
  title = "Google";
  subtitle = "Gmail";
  description = "Gmail is used to send emails";
  dummyData: any;
  constructor(
    private productDataServiceService: ProductDataServiceService,
    private fetchRecordService: FetchRecordService
  ) {}

  ngOnInit() {
    this.productDataServiceService.getAllProducts().subscribe(data => {
      this.dummyData = data;
    });
    this.fetchRecordService.fetchCollection("bookings").subscribe(res => {
      console.log(res);
    });
  }
}
