import { Button, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Facture({ clientInfo, cart, totalPrice, montant }) {

  const exportToPdf = () => {
    const input = document.getElementById('facture-content');
    
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 10; 

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

    
      pdf.save('facture.pdf');

     
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl); 
    });
  };

  
  const printFacture = () => {
    const printContent = document.getElementById('facture-content');
    const WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(`
      <html>
        <head>
          <title>Facture</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>${printContent.outerHTML}</body>
      </html>
    `);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  return (
    <div className='bg-slate-600 p-3 leading-loose'>
      <h1>Facture d'achat</h1>

      {/* Conteneur de la facture */}
      <div id="facture-content" className="p-5 bg-white">
        <div>
          <h2>Informations client</h2>
          <p><strong>Nom:</strong> {clientInfo.nom}</p>
          <p><strong>Email:</strong> {clientInfo.email}</p>
          <p><strong>Téléphone:</strong> {clientInfo.telephone}</p>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nom</strong></TableCell>
                <TableCell><strong>Designation</strong></TableCell>
                <TableCell><strong>Prix Unitaire</strong></TableCell>
                <TableCell><strong>Quantité</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.nom}</TableCell>
                  <TableCell>{item.designation}</TableCell>
                  <TableCell>{item.prix} MGA</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.prix * item.quantity} MGA</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}><strong>Total</strong></TableCell>
                <TableCell colSpan={3}><strong>{totalPrice} MGA</strong></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <div className="mt-4">
          <div className='flex items-center gap-3'>
            <p><strong>Total à payer:</strong></p>
            <p>{totalPrice} MGA</p>
          </div>
          <div className='flex items-center gap-3'>
            <p><strong>Montant payé:</strong></p>
            <p>{montant} MGA</p>
          </div>
          <div className='flex items-center gap-3'>
            <p><strong>Reste à payer:</strong></p>
            <p>{montant - totalPrice} MGA</p>
          </div>
        </div>
      </div>

      {/* Boutons pour exporter et imprimer */}
      <div className="mt-5 flex gap-3">
        <Button onClick={exportToPdf} variant='contained' color='primary'>
          Exporter en PDF
        </Button>
        <Button onClick={printFacture} variant='contained' color='secondary'>
          Imprimer la facture
        </Button>
      </div>
    </div>
  );
}
