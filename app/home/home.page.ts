import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../services/fetch-products.service';
import { Product } from '../classes/Product';

import { ModalController } from '@ionic/angular';
import { ProductModal } from '../components/product-modal/product-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{
  product!: Product[];


  constructor(private modalCtrl: ModalController, private fetchProductService: FetchProductsService) {}

  ngOnInit(): void {
    this.fetchProductService.getProducts().subscribe(
      data=>{
        console.log(data);
        this.product=data;
      }
    );
  }
  
  deleteProduct(productId: string) {
    console.log('Delete product with ID:', productId);
    this.fetchProductService.deleteProduct(productId).subscribe(
      () => {
        // Fetch new data after delete is completed
        this.fetchProductService.getProducts().subscribe(
          data => {
            console.log(data);
            this.product = data;
          },
          error => {
            // Handle any error that might occur while fetching new data
            console.error('Error fetching new data:', error);
          }
        );
      },
      error => {
        // Handle any error that might occur during delete operation
        console.error('Error deleting product:', error);
      }
    );
  }
  
  async createModal() {
    
    const modal = await this.modalCtrl.create({
      component: ProductModal,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log('Nuevo Producto Creado');
      this.fetchProductService.getProducts().subscribe(
        data=>{
          console.log(data);
          this.product=data;
        }
      );
    }
  }

  async updateModal(productData: Product) {
    const modal = await this.modalCtrl.create({
      component: ProductModal,
      componentProps: {
        product: productData // Pass the product object adhering to the Product interface
      }
    });

    return await modal.present();
  }

}
