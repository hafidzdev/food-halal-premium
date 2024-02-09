"use client";
import BarcodeScanner from "@/components/partials/barcodeScanner";
import React, { useState } from "react";

const MyPage = () => {
  const [scannedBarcode, setScannedBarcode] = useState(null);
  console.log(scannedBarcode);
  const handleScan = (barcode) => {
    setScannedBarcode(barcode);
    // Do something with the scanned barcode, like sending it to an API or updating state
  };

  return (
    <div>
      <BarcodeScanner onScan={handleScan} />
      {scannedBarcode && <p>Scanned Barcode: {scannedBarcode}</p>}
    </div>
  );
};

export default MyPage;
