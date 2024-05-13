import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent {
  qrContent: string = '';
  qrImageUrl: string = '';

  constructor(private http: HttpClient) {}

  generateQRCode() {
    this.http.get('http://localhost:5000/generate_qr/' + this.qrContent, { responseType: 'arraybuffer' })
      .subscribe(response => {
        this.createImageFromBlob(new Blob([response], { type: 'image/png' }));
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.qrImageUrl = reader.result as string;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  downloadQRCode() {
    const link = document.createElement('a');
    link.href = this.qrImageUrl;
    link.download = 'qr_code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  reset() {
    this.qrImageUrl = '';
    this.qrContent = '';
  }
}
