import React, { useEffect } from "react";
import Quagga from "quagga";
// import Quagga from "quagga";

const BarcodeScanner = ({ onScan }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: 480,
            height: 320,
            facingMode: "environment", // or user
          },
        },
        decoder: {
          readers: ["ean_reader"], // You can specify the types of barcodes you want to scan
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      onScan(data.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, [onScan]);

  return <div id="scanner-container"></div>;
};

export default BarcodeScanner;
