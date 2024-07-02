function generateQRCode() {
    const data = document.getElementById('data').value;
    const color = document.getElementById('color').value;
    const canvas = document.getElementById('qrCanvas');
    const context = canvas.getContext('2d');
    const logoInput = document.getElementById('logoInput');

    
    const size = 450;
    canvas.width = size;
    canvas.height = size;

    
    context.clearRect(0, 0, canvas.width, canvas.height);

    QRCode.toCanvas(canvas, data, { width: size, height: size, color: { dark: color, light: '#FFFFFF' } }, function (error) {
        if (error) {
            console.error(error);
            alert('Failed to generate QR code.');
            return;
        }
        console.log('QR code generated!');
        if (logoInput.files && logoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const logo = new Image();
                logo.src = e.target.result;
                logo.onload = function() {
                    const logoSize = canvas.width / 4;
                    const logoX = (canvas.width - logoSize) / 2;
                    const logoY = (canvas.height - logoSize) / 2;
                    context.drawImage(logo, logoX, logoY, logoSize, logoSize);
                }
                logo.onerror = function() {
                    console.error('Failed to load logo image.');
                    alert('Failed to load logo image.');
                }
            }
            reader.readAsDataURL(logoInput.files[0]);
        }
    });
}

function saveQRCode() {
    const canvas = document.getElementById('qrCanvas');
    const link = document.createElement('a');
    link.download = 'qr_code.png';
    link.href = canvas.toDataURL('image/png', 1.0); 
    link.click();
}