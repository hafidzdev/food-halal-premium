import React, { useEffect } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onScan }) => {
  const _onDetected = (result) => {
    console.log(result.codeResult.code);
    let code = result.codeResult.code.substring(0, 3);
    console.log(code);
    if (code !== "") {
      Quagga.stop();
      return onScan(result);
    }
  };

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

    Quagga.onDetected(_onDetected);
    // Quagga.onDetected((data) => {
    //   onScan(data.codeResult.code);
    // });

    return () => {
      Quagga.stop();
    };
  }, [onScan]);

  return <div id="scanner-container"></div>;
};

export default BarcodeScanner;
