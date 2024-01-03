import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/Product';
import { ModalController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../services/environment';

@Component({
  selector: 'product-modal',
  templateUrl: 'product-modal.component.html',
})

export class ProductModal implements OnInit {
  @Input() product!: Product; // Use the Product interface as the type
  upc!: string;
  prodName!: string;
  mfgr!: string;
  model!: string;
  stock!: number ;
  unitPrice!: number ;
  productId!: string ;
  constructor(private modalCtrl: ModalController, private http: HttpClient) {
  }
  ngOnInit() {
    this.prodName = this.product.prodName;
    this.upc = this.product.upc;
    this.mfgr = this.product.mfgr;
    this.model = this.product.model;
    this.stock = this.product.stock;
    this.unitPrice = this.product.unitPrice;
    this.productId = this.product.id;
    console.log('Product in modal:', this.product); // Logging the product in ngOnInit
  }

  cancel() {
    console.log("click en cancelar Modal");
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {

     

    if (this.product) {
      // Takes the text box values

      this.product.prodName= this.prodName ;
      this.product.upc= this.upc;
      this.product.mfgr = this.mfgr;
      this.product.model = this.model ;
      this.product.stock = this.stock;
      this.product.unitPrice = this.unitPrice;
      console.log("Producto existente Actualiza la informacion");
      try {
        const url = environment.apiUrl; // API endpoint
        // Assuming your API expects a PUT request with the product object
        const updatedProduct = await this.http.put<Product>(url, this.product).toPromise();

        console.log('Product updated:', updatedProduct);
      } catch (error) {
        console.error('Error updating product:', error);

      }
    }
    else
    {
      var newProduct : Product = {
        id:'',
        prodName: this.prodName,
        upc: this.upc,
        mfgr: this.mfgr,
        model:this.model,
        stock: this.stock,
        unitPrice: this.unitPrice
      };
      console.log("Producto inexistente Crea el producto");
      try {
        const url = environment.apiUrl; // Replace with your API endpoint
        // Assuming your API expects a PUT request with the product object
        const createdProduct = await this.http.post<Product>(url, newProduct).toPromise();

        console.log('Product Created:', createdProduct);
      } catch (error) {
        console.error('Error Creating product:', error);
      }
    }
    return this.modalCtrl.dismiss(this.upc, 'confirm'); // close the modal
  }
}