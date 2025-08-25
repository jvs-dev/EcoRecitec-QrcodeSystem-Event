import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import './QRCodeScanner.css'

const QRCodeScanner = ({ onScan }) => {
  const scannerRef = useRef(null);
  let html5QrcodeScanner = null;

  useEffect(() => {
    if (!html5QrcodeScanner && scannerRef.current) {
      html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-code-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      const onScanSuccess = (decodedText) => {
        onScan(decodedText);
      };

      const onScanFailure = (error) => {
         console.log(error);
         
        // Ignore erros de escaneamento.
      };

      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }

    return () => {
      if (html5QrcodeScanner && html5QrcodeScanner.getState() === 2) {
        html5QrcodeScanner.clear().catch((error) => {
          console.error("Falha ao parar o scanner:", error);
        });
      }
    };
  }, []);

  return (
    <div className="scanner">
      <div
        id="qr-code-reader"
        ref={scannerRef}
        className="scanner__reader"
      ></div>
    </div>
  );
};

export default QRCodeScanner;
