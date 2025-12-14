import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../../../core/services/inventory.service';
import { Inventory } from '../../../../@models/entities/Inventory.interface';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent{
  inventory: Inventory = null;
  confirmationName: string = '';

  constructor(
    private _inventoryService: InventoryService,
    private _router: Router,
    private _toastService :ToastService
  ) {

      this.inventory = this._inventoryService.inventory.value;
    this._inventoryService.inventory.subscribe((inventory) => {
      this.inventory = inventory;
    });
  }


  async deleteInventory() {
    if (!this.inventory || this.confirmationName !== this.inventory.label) {
      return;
    }

    // Confirmation supplémentaire avec une boîte de dialogue
    if (confirm('Êtes-vous ABSOLUMENT sûr de vouloir supprimer cet inventaire ? Cette action est irréversible.')) {
      try {
        await this._inventoryService.delete(this.inventory.id);
        localStorage.removeItem('selectedInventoryId');
        this._toastService.displayToast('sucess', 'L\'inventaire à bien été supprimé')
        await this._router.navigate(['/private/inventory']);
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'inventaire', error);
        alert('Une erreur est survenue lors de la suppression de l\'inventaire.');
      }
    }
  }
}
