<template>
    <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="blue-lighten-3" indeterminate :size="41" :width="5"></v-progress-circular>
        Loading...
    </v-overlay>
    <v-card>
        <VCardItem class="align-left">
            <span color="primary" @click="goBack" style="cursor: pointer">
                <VIcon icon="bx-arrow-back" color="primary" tag="back" start />
                Back
            </span>
            <VCardTitle class="text-2xl font-weight-bold">
                Tanda Tangan
            </VCardTitle>
        </VCardItem>
        <v-card-text>
            <v-row class="mt-4 mb-4">
                <v-col md="12" cols="6">
                    <span class="subtitle-1 text-center">
                        <span style="color: red">*</span> File Tanda Tangan (format png):
                    </span>
                    <v-file-input label="Upload Tanda Tangan" accept="image/png" prepend-icon="mdi-image" outlined dense
                        @change="handleFileUpload"></v-file-input>
                </v-col>
                <v-col md="12" cols="6" class="d-flex justify-end">
                    <v-btn color="primary" @click="savePDF">
                        <v-icon left>mdi-file-pdf-box</v-icon>
                        Simpan PDF dengan Tanda Tangan
                    </v-btn>
                </v-col>
            </v-row>

            <div class="pdf-viewer" ref="pdfContainer">
                <!-- placed rendered pdf -->
                <img v-if="signature" ref="signatureImage" :src="signature" class="signature"
                    @load="initSignaturePosition" />
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import mainURL from '@/axios';
import interact from 'interactjs';
import { PDFDocument } from 'pdf-lib';

export default {
    name: 'PdfViewer',
    data() {
        return {
            overlay: false,
            signature: null, // Untuk menyimpan URL gambar tanda tangan
            pdf: null, // Objek PDF
            interactable: null,

            filePath: this.$filePath,
            detailAttach: null,
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async renderPDF(url) {
            // Import PDF.js library
            const pdfjsLib = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.mjs');
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';

            if (!url) return;

            try {
                // Fetch the PDF file from the URL
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch PDF: ${response.statusText}`);
                }

                const arrayBuffer = await response.arrayBuffer();
                const loadingTask = pdfjsLib.getDocument(arrayBuffer);

                // Load and render the PDF
                const pdf = await loadingTask.promise;

                // Get the container element for the PDF
                const container = this.$refs.pdfContainer;
                container.innerHTML = ''; // Clear previous renders

                // Calculate the scale factor based on the container width and the PDF page width
                const firstPage = await pdf.getPage(1);
                const viewport = firstPage.getViewport({ scale: 1 });
                const containerWidth = container.clientWidth;
                const scale = containerWidth / viewport.width;

                // Render each page with the calculated scale
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const scaledViewport = page.getViewport({ scale });

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = scaledViewport.height;
                    canvas.width = scaledViewport.width;

                    // Render PDF page into canvas context
                    const renderContext = {
                        canvasContext: context,
                        viewport: scaledViewport
                    };
                    await page.render(renderContext).promise;

                    // Append the canvas to the container
                    container.appendChild(canvas);
                }

            } catch (error) {
                console.error('Error rendering PDF:', error);
            }
        },

        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.signature = URL.createObjectURL(file);
            }
        },

        initSignaturePosition() {
            const img = this.$refs.signatureImage;
            this.interactable = interact(img)
                .draggable({
                    onmove: this.dragMoveListener,
                })
                .resizable({
                    edges: { left: true, right: true, bottom: true, top: true },
                    listeners: {
                        move(event) {
                            let { x, y } = event.target.dataset;

                            x = (parseFloat(x) || 0) + event.deltaRect.left;
                            y = (parseFloat(y) || 0) + event.deltaRect.top;

                            Object.assign(event.target.style, {
                                width: `${event.rect.width}px`,
                                height: `${event.rect.height}px`,
                                transform: `translate(${x}px, ${y}px)`,
                            });

                            event.target.dataset.x = x;
                            event.target.dataset.y = y;
                        },
                    },
                });
        },

        dragMoveListener(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        },

        async getPdfArrayBuffer(pdfUrl) {
            const response = await fetch(pdfUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch PDF: ${response.statusText}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            return arrayBuffer;
        },

        async savePDF() {
            if (!this.signature) {
                alert('Upload tanda tangan terlebih dahulu');
                return;
            }

            const img = this.$refs.signatureImage;
            const signatureX = parseFloat(img.getAttribute('data-x')) || 0;
            const signatureY = parseFloat(img.getAttribute('data-y')) || 0;
            const signatureWidth = img.width;
            const signatureHeight = img.height;

            // Load the PDF file
            const pdfBlob = await this.getPdfArrayBuffer(this.filePath + '/' + this.detailAttach.file_id + '/' + this.detailAttach.path);
            const pdfDoc = await PDFDocument.load(pdfBlob);

            // Embed the signature image
            const signatureBlob = await this.getPdfArrayBuffer(this.signature);
            const signatureImage = await pdfDoc.embedPng(signatureBlob);

            // Use the container width to calculate the scale factor used during rendering
            const container = this.$refs.pdfContainer;
            const containerWidth = container.clientWidth;

            // Assume the first page's width (as rendered in the canvas) is the reference width for scaling
            const firstPage = await pdfDoc.getPage(0);
            const pdfPageWidth = firstPage.getWidth();
            const scaleFactor = pdfPageWidth / containerWidth;

            // Calculate the actual coordinates and dimensions for the signature on the PDF
            const scaledX = signatureX * scaleFactor;
            const scaledY = signatureY * scaleFactor;
            const scaledWidth = signatureWidth * scaleFactor;
            const scaledHeight = signatureHeight * scaleFactor;

            // Find the target page and adjust the Y-coordinate
            let targetPage = null;
            let remainingHeight = scaledY;
            const pdfPages = pdfDoc.getPages();

            for (const page of pdfPages) {
                const pageHeight = page.getHeight();

                if (remainingHeight <= pageHeight) {
                    targetPage = page;
                    break;
                }
                remainingHeight -= pageHeight;
            }

            if (!targetPage) {
                alert('Error, Tanda tangan di tempatkan di luar halaman terakhir');
                return;
            }

            // Calculate the Y position in the PDF's coordinate system (bottom-left origin)
            let adjustedY = targetPage.getHeight() - remainingHeight - scaledHeight;

            // Draw the signature image on the target page
            targetPage.drawImage(signatureImage, {
                x: scaledX,
                y: adjustedY,
                width: scaledWidth,
                height: scaledHeight,
            });

            // // Save the modified PDF
            // const pdfBytes = await pdfDoc.save();

            // // Create a blob from PDF bytes
            // const modifiedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

            // // Create object URL for modified PDF
            // const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);

            // // Trigger download of modified PDF
            // const link = document.createElement('a');
            // link.href = modifiedPdfUrl;
            // link.download = this.detailAttach.path;
            // link.click();

            // //update file pdf 
            // this.goBack();

            // Save the modified PDF
            const pdfBytes = await pdfDoc.save();

            // Create a blob from PDF bytes
            const modifiedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

            // Update file PDF
            try {
                this.overlay = true;
                const id = this.$route.params.idAttach;

                const formData = new FormData();
                formData.append("doc", new File([modifiedPdfBlob], this.detailAttach.path, { type: 'application/pdf' }));
                formData.append("_method", "PUT");

                const response = await mainURL.post(
                    `/user/signature/${id}`,
                    formData
                );
                if (response.status === 200) {
                    this.overlay = false;
                    this.$showToast("success", "Success", response.data.message);
                    this.goBack();
                } else {
                    this.overlay = false;
                    this.$showToast("error", "Sorry", response.data.data.message);
                }
            } catch (error) {
                this.overlay = false;
                window.location.reload();
                this.$showToast("error", "Error", "Failed to update the signed document");
            }
        },

        async getDetailAttach() {
            try {
                this.overlay = true;
                const id = this.$route.params.idAttach;
                const response = await mainURL.get(`/user/get-attach/${id}`);

                if (response.status == 200) {
                    this.detailAttach = response.data.data;
                    await this.renderPDF(this.filePath + '/' + this.detailAttach.file_id + '/' + this.detailAttach.path);
                    this.overlay = false;
                } else {
                    this.$showToast("error", "Sorry", response.data.data.message);
                    this.overlay = false;
                }
            } catch (error) {
                this.$showToast("error", "Sorry", error.response.data.message);
                this.overlay = false;
            }
        }
    },
    async mounted() {
        await this.getDetailAttach();
    },
};
</script>

<style scoped>
.pdf-viewer {
    position: relative;
    width: 100%;
    /* Ensure the PDF container takes the full width of its parent */
    overflow-x: auto;
    /* Allow horizontal scrolling if necessary */
    border: 1px solid #000;
}

canvas {
    display: block;
    margin-bottom: 10px;
    /* Space between pages */
}

.signature {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    cursor: move;
    border: 2px dashed #000;
    resize: both;
    overflow: auto;
}
</style>
