// Function to generate the PDF
function generatePDF(preview = false) {
    // Get the user's input
    var destinatario = document.getElementById('destinatario').value;
    var nombre = document.getElementById('nombre').value;
    var identificacion = document.getElementById('identificacion').value;
    var hechos = document.getElementById('hechos').value;
    var peticion = document.getElementById('peticion').value;
    var anexos = document.getElementById('anexos').value;
    var notificaciones = document.getElementById('notificaciones').value;

    // Check that all fields are filled
    if (!destinatario || !nombre || !identificacion || !hechos || !peticion || !anexos || !notificaciones) {
        alert('Debes rellenar todos los campos');
        return;
    }

    // Create a new jsPDF instance
    var doc = new jsPDF();

    // Set the font to Helvetica
    doc.setFont('helvetica');

    // Add the content to the PDF
// Set an initial y-coordinate
var y = 10;

// Add the content to the PDF
doc.text('Senores:', 10, y);
doc.setFontStyle('bold');
y += 10;
doc.text(destinatario, 10, y);
doc.text('Asunto: Peticion (Art. 23 CP1991)', 10, y += 20);
doc.setFontStyle('normal');
doc.text(nombre + ' identificado con documento no. ' + identificacion + ' interpongo la presente peticion, fundamentada en los siguientes:', 10, y += 20,  { maxWidth: 180 });
doc.setFontStyle('bold');
doc.text('HECHOS:', 10, y += 20);
doc.setFontStyle('normal');
doc.text(hechos, 10, y += 10,  { maxWidth: 180 });
doc.setFontStyle('bold');
doc.text('PETICION:', 10, y += 30);
doc.setFontStyle('normal');
doc.text(peticion, 10, y += 10, { maxWidth: 180 });
doc.setFontStyle('bold');
doc.text('ANEXOS:', 10, y += 30);
doc.setFontStyle('normal');
doc.text(anexos, 10, y += 10);
doc.setFontStyle('bold');
doc.text('NOTIFICACIONES:', 10, y += 20);
doc.setFontStyle('normal');
doc.text(notificaciones, 10, y += 10);
doc.text('Gracias.', 10, y += 20);
doc.text('Atentamente,\n\n' + nombre + '\n' + identificacion, 10, y += 20);


// Add the watermark to each page
var totalPages = doc.internal.getNumberOfPages();
for (var i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setTextColor(200, 200, 200); // Set the text color to light gray
    var str = "Hecho con DDP_APP";
    var textSize = doc.getTextDimensions(str);
    var pageHeight = doc.internal.pageSize.height;
    var pageWidth = doc.internal.pageSize.width;
    doc.text(str, pageWidth - textSize.w - 10, pageHeight - 10); // Position the text at the bottom right corner
    doc.setTextColor(0, 0, 0); // Reset the text color to black
}

    if (preview) {
        var pdfData = doc.output('datauristring');
        var win = window.open();
        win.document.write('<iframe src="' + pdfData + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    } else {
        // Save the PDF with the specified name
        doc.save('DDP_' + nombre + '_' + new Date().toISOString().slice(0,10) + '.pdf');
    }
}

document.getElementById('preview').addEventListener('click', function() { generatePDF(true); });
document.getElementById('download').addEventListener('click', function() { generatePDF(false); });
