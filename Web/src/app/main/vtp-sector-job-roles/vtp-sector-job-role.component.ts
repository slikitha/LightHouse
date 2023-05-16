import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VTPSectorJobRoleModel } from './vtp-sector-job-role.model';
import { VTPSectorJobRoleService } from './vtp-sector-job-role.service';
import { BaseListComponent } from 'app/common/base-list/base.list.component';
import { fuseAnimations } from '@fuse/animations';
import { DialogService } from 'app/common/confirm-dialog/dialog.service';

@Component({
  selector: 'data-list-view',
  templateUrl: './vtp-sector-job-role.component.html',
  styleUrls: ['./vtp-sector-job-role.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class VTPSectorJobRoleComponent extends BaseListComponent<VTPSectorJobRoleModel> implements OnInit {
  constructor(public commonService: CommonService,
    public router: Router,
    public routeParams: ActivatedRoute,
    public snackBar: MatSnackBar,
    public zone: NgZone,
    private dialogService: DialogService,
    private vtpSectorJobRoleService: VTPSectorJobRoleService) {
    super(commonService, router, routeParams, snackBar, zone);
  }

  ngOnInit(): void {
    this.vtpSectorJobRoleService.GetAllByCriteria(this.SearchBy).subscribe(response => {
      this.displayedColumns = ['VTPId', 'SectorId', 'Actions'];

      this.tableDataSource.data = response.Results;
      this.tableDataSource.sort = this.ListSort;
      this.tableDataSource.paginator = this.ListPaginator;
      this.tableDataSource.filteredData = this.tableDataSource.data;

      this.zone.run(() => {
        if (this.tableDataSource.data.length == 0) {
          this.showNoDataFoundSnackBar();
        }
      });
      this.IsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  onDeleteVTPSectorJobRole(vtpSectorJobRoleId: string) {
    this.dialogService
      .openConfirmDialog(this.Constants.Messages.DeleteConfirmationMessage)
      .afterClosed()
      .subscribe(confResp => {
        if (confResp) {
          this.vtpSectorJobRoleService.deleteVTPSectorJobRoleById(vtpSectorJobRoleId)
            .subscribe((vtpSectorJobRoleResp: any) => {

              this.zone.run(() => {
                if (vtpSectorJobRoleResp.Success) {
                  this.showActionMessage(
                    this.Constants.Messages.RecordDeletedMessage,
                    this.Constants.Html.SuccessSnackbar
                  );
                }
                this.ngOnInit();
              }, error => {
                console.log('VTPSectorJobRole deletion errors =>', error);
              });

            });
          this.ngOnInit();
        }
      });
  }
}
