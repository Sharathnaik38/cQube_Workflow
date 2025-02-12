import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AppServiceComponent } from "../app.service";
import { KeycloakSecurityService } from "../keycloak-security.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  state;
  semester = true;
  //tooltip texts::::::::::::::
  imrTooltip;
  crTooltip;
  udiseTooltip;
  compositeTooltip;
  dscTooltip;
  dccTooltip;
  utTooltip;
  dtrTooltip;
  utcTooltip;
  crcrTooltip;
  srTooltip;
  patTooltip;
  semExpTooltip;
  isdataTooltip;
  sarTooltip;
  tarTooltip;
  telemDataTooltip;
  heatChartTooltip;
  lotableTooltip;
  tpdtpTooltip;
  tpdcpTooltip;
  healthCardTooltip;
  patExcptTooltip;
  sarExcptTooltip;
  tarExpTooltip;
  satTooltip;
  satHeatChartTooltip;

  hiddenPass = false;
  edate: Date;
  telemetryData = [];
  timePeriod;

  imrViews;
  crViews;
  udiseViews;
  compositeViews;
  dscViews;
  dccViews;
  utViews;
  dtrViews;
  utcViews;
  crcrViews;
  srViews;
  patViews;
  semExpViews;
  isdataViews;
  sarViews;
  tarViews;
  telemDataViews;
  heatChartViews;
  lotableViews;
  tpdtpViews;
  tpdcpViews;
  tpdenrollViews;
  tpdcompViews;
  healthCardViews;
  patExcptViews;
  sarExcptViews;
  tarExpViews;
  satViews;
  satHeatChartViews;

  //for coming soon page
  nifi_crc;
  nifi_attendance;
  nifi_semester;
  nifi_infra;
  nifi_diksha;
  nifi_telemetry;
  nifi_udise;
  nifi_pat;
  nifi_composite;
  nifi_sat;


  managementType;
  categoryType;

  // diksha columns
  diksha_column =
    "diksha_columns" in environment ? environment["diksha_columns"] : true;

  constructor(
    private service: AppServiceComponent,
    public keyCloakService: KeycloakSecurityService,
    private changeDetection: ChangeDetectorRef,
  ) {
    service.logoutOnTokenExpire();
    this.changeDataSourceStatus();
  }

  getDefault() {
    this.service.getDefault().subscribe(res => {
      this.managementType = res[0]['name'];
      this.categoryType = res[1]['name'];
      this.setDefault();
    });
  }

  setDefault() {
    this.changeDetection.detectChanges();
    if (localStorage.getItem('management') == null) {
      this.management = this.managementType;
      this.category = this.categoryType;
      let obj = {
        id: this.managementType,
        value: this.service.changeingStringCases(this.managementType.replace(/_/g, ' '))
      }
      localStorage.setItem("management", JSON.stringify(obj));
      obj = {
        id: this.categoryType,
        value: this.service.changeingStringCases(this.categoryType.replace(/_/g, ' '))
      }
      localStorage.setItem("category", JSON.stringify(obj));
    } else {
      this.management = JSON.parse(localStorage.getItem('management')).id;
      this.category = JSON.parse(localStorage.getItem('category')).id;
    }
    if (this.managementType) {
      if (this.managements.length <= 0) {
        this.managements.push({ id: this.managementType, value: this.service.changeingStringCases(this.managementType.replace(/_/g, ' ')) })
      }
    } else {
      this.management = JSON.parse(localStorage.getItem('management')).id;
      this.category = JSON.parse(localStorage.getItem('category')).id;
    }
  }

  ngOnInit() {
    sessionStorage.clear();
    document.getElementById("spinner").style.display = "block";
    document.getElementById("homeBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "block";
    if (localStorage.getItem("roleName") == "admin") {
      this.hiddenPass = false;
    } else {
      this.hiddenPass = true;
    }
    this.callOnInterval();
    setInterval(() => {
      this.callOnInterval();
    }, 30000);

    this.state = this.service.state;
    this.imrTooltip = `This geo-location-based dashboard provides insights on school infrastructure access across ${this.state}.`;
    this.crTooltip = `This dashboard allows users to correlate various available metrics on school infrastructure data using a combined visualisation of the scatter plot and table.`;
    this.udiseTooltip = `This geo-location dashboard converts data available in UDISE into actionable indices that can be visualised at various administrative levels across ${this.state}`;
    this.compositeTooltip = `This dashboard brings metrics from other dashboards and allows users to correlate various metrics among each other.`;
    this.dscTooltip = `This dashboard provides insights on grade and subject-wise consumption of TPD courses broken by user type.`;
    this.dccTooltip = `This dashboard provides insight on district-wise usage of TPD courses`;
    this.utTooltip = `This dashboard provides insights on district-wise usage of ETB`;
    this.dtrTooltip = `This dashboard provides insights on total usage at the course content level.`;
    this.utcTooltip = `This dashboard provides insights on the total usage at the ETB content level.`;
    this.crcrTooltip = `This dashboard allows users to correlate various available metrics calculated from the CRC visit data using a combined visualisation of the scatter plot and table.`;
    this.srTooltip = `This geo-location-based dashboard provides insights on student semester performance across ${this.state}.`;
    this.patTooltip = `This geo-location-based dashboard provides insights on student Periodic Assessment Test (PAT) performance across ${this.state}.`;
    this.semExpTooltip = `This geo-location-based dashboard provides insights on those schools that did not upload their semester scores.`;
    this.isdataTooltip = `This dashboard allows you to download exception reports for the different dashboards available on cQube`;
    this.sarTooltip = `This geo-location-based dashboard provides insights on Student Attendance across ${this.state}.`;
    this.tarTooltip = `This geo-location-based dashboard provides insights on Teacher Attendance across ${this.state} `;
    this.telemDataTooltip = `This dashboard provides insights on usage statistics for cQube`;
    this.heatChartTooltip = `This dashboard provides insights on student performance at the question level.`;
    this.lotableTooltip = `This dashboard provides insights on student performance at the learning outcome level.`;
    this.tpdtpTooltip = `This dashboard provides details on district-wise TPD course enrolment progress broken at the individual course level.`;
    this.tpdcpTooltip = `This dashboard provides details on district-wise TPD course enrolment progress broken at the individual course level.`;
    this.healthCardTooltip = `This dashboard brings metrics from other dashboards and allows users to correlate various metrics among each other.`;
    this.patExcptTooltip = `This geo-location-based dashboard provides insights on those schools that did not upload their periodic assessment scores.`;
    this.tarExpTooltip = `This geo-location-based dashboard provides insights on those schools that did not upload their teacher attendance data.`;
    this.sarExcptTooltip = `This geo-location-based dashboard provides insights on those schools that did not upload their student attendance data.`;
    this.satTooltip = `This geo-location-based dashboard provides insights on student Periodic Assessment Test (SAT) performance across ${this.state}.`;
    this.satHeatChartTooltip =
      "This dashboard provides insights on student performance at the question level.";

    this.service.management_category_metaData().subscribe((res) => {
      this.managements = res["mydata"].management;
      this.managements.unshift({ id: "overall", value: "Overall" });
      this.categories = res["mydata"].category;
      this.categories.unshift({ id: "overall", value: "Overall" });
      document.getElementById("spinner").style.display = "none";
    }, err => {
      let isThere = false;
      this.managements.map(item => {
        if (item.id != JSON.parse(localStorage.getItem('management')).id) {
          isThere = true;
          return isThere;
        }
      });
      if (isThere) {
        this.managements.unshift(JSON.parse(localStorage.getItem('management')));
      }
      if (JSON.parse(localStorage.getItem('management'))) {
        var name = this.managements.find(a => { return a.id == JSON.parse(localStorage.getItem('management')).id });
        if (name && name.value != 'Overall') {
          this.managements.unshift({ id: "overall", value: "Overall" });
        }
      }
      document.getElementById("spinner").style.display = "none";
    });
    this.getDefault();
  }

  //Management and category
  managements = [];
  public management;
  categories = [];
  public category;
  onSelectManagement() {
    var obj = {
      id: this.management,
      value: this.service.changeingStringCases(this.management.replace(/_/g, ' '))
    }
    localStorage.setItem("management", JSON.stringify(obj));
    this.changeDetection.detectChanges();
  }
  onSelectCategory() {
    var obj = {
      id: this.category,
      value: this.service.changeingStringCases(this.category.replace(/_/g, ' '))
    }
    localStorage.setItem("category", JSON.stringify(obj));
    this.changeDetection.detectChanges();
  }

  changeDataSourceStatus() {
    this.service.getDataSource().subscribe((res: any) => {
      res.forEach((element) => {
        if (element.template == "nifi_crc") {
          this.nifi_crc = element.status;
        }
        if (element.template == "nifi_attendance") {
          this.nifi_attendance = element.status;
        }
        if (element.template == "nifi_semester") {
          this.nifi_semester = element.status;
        }
        if (element.template == "nifi_infra") {
          this.nifi_infra = element.status;
        }
        if (element.template == "nifi_diksha") {
          this.nifi_diksha = element.status;
        }
        if (element.template == "nifi_telemetry") {
          this.nifi_telemetry = element.status;
        }
        if (element.template == "nifi_udise") {
          this.nifi_udise = element.status;
        }
        if (element.template == "nifi_pat") {
          this.nifi_pat = element.status;
        }
        if (element.template === "nifi_composite") {
          this.nifi_composite = element.status;
        }
        if (element.template === 'nifi_sat') {
          this.nifi_sat = element.status;
        }
      });
    });
  }

  callOnInterval() {
    this.getViews24hrs();
    setTimeout(() => {
      this.getViews7days();
    }, 10000);
    setTimeout(() => {
      this.getViews30days();
    }, 20000);
  }

  fetchTelemetry(event, report) {
    this.service.getTelemetryData(report, event.type);
    document.getElementById("homeBtn").style.display = "block";
    document.getElementById("backBtn").style.display = "none";
    this.service.homeControl();
  }

  getViews24hrs() {
    this.service.getTelemetry("last_day").subscribe((res) => {
      this.telemetryData = res["telemetryData"];
      this.assignViews(this.telemetryData);
    });
  }

  getViews7days() {
    this.service.getTelemetry("last_7_days").subscribe((res) => {
      this.telemetryData = res["telemetryData"];
      this.assignViews(this.telemetryData);
    });
  }

  getViews30days() {
    this.service.getTelemetry("last_30_days").subscribe((res) => {
      this.telemetryData = res["telemetryData"];
      this.assignViews(this.telemetryData);
    });
  }

  assignViews(views) {
    this.imrViews = "";
    this.crViews = "";
    this.udiseViews = "";
    this.compositeViews = "";
    this.dscViews = "";
    this.dccViews = "";
    this.utViews = "";
    this.dtrViews = "";
    this.utcViews = "";
    this.crcrViews = "";
    this.srViews = "";
    this.patViews = "";
    this.semExpViews = "";
    this.isdataViews = "";
    this.sarViews = "";
    this.tarViews = "";
    this.telemDataViews = "";
    this.heatChartViews = "";
    this.lotableViews = "";
    this.tpdcpViews = "";
    this.tpdtpViews = "";
    this.tpdenrollViews = "";
    this.tpdcompViews = "";
    this.patExcptViews = "";
    this.sarExcptViews = "";
    this.tarExpViews = "";
    this.satViews = "";
    this.satHeatChartViews = "";

    var myStr = this.removeUnderscore(views[0].time_range);
    this.timePeriod = " (" + myStr + ")";

    views.forEach((element) => {
      let timeStr = this.removeUnderscore(element.time_range);
      if (element.reportid == "imr") {
        this.imrViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "cr") {
        this.crViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "udise") {
        this.udiseViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "composite") {
        this.compositeViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "dsc") {
        this.dscViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "dcc") {
        this.dccViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "ut") {
        this.utViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "dtr") {
        this.dtrViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "utc") {
        this.utcViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "crcr") {
        this.crcrViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "sr") {
        this.srViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "pat") {
        this.patViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "SemExp") {
        this.semExpViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "isdata") {
        this.isdataViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "sar") {
        this.sarViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "tar") {
        this.tarViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "telemData") {
        this.telemDataViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "heatChart") {
        this.heatChartViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "lotable") {
        this.lotableViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "tpd-cp") {
        this.tpdcpViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "tpd-tp") {
        this.tpdtpViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "tpd-enroll") {
        this.tpdenrollViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "tpd-comp") {
        this.tpdcompViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "healthCard") {
        this.healthCardViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "patExcpt") {
        this.patExcptViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "sarExcpt") {
        this.sarExcptViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "tarExp") {
        this.tarExpViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "sat") {
        this.satViews = element.number_of_views + " (" + timeStr + ")";
      }
      if (element.reportid == "satHeatChart") {
        this.satHeatChartViews = element.number_of_views + " (" + timeStr + ")";
      }
    });
  }

  removeUnderscore(data) {
    var mydata = data.replace(/_/g, " ");
    var myStr = mydata.charAt(0).toUpperCase() + mydata.substr(1).toLowerCase();
    return myStr;
  }
}
