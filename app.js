const html5QrCode = new Html5Qrcode("reader");
const config = {
  fps: 10,
  qrbox: { width: 150, height: 150 },
};

function qrCodeSuccessCallback(decodedText, decodedResult) {
  resetSettings();
}

function resetSettings() {
  html5QrCode.stop();
  $(".qr-code-container").hide();
  $(".close-btn").hide();
  $("body").removeClass("no-scroll");
}

$(document).on("click", ".qr-area", function () {
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        var backCamera = devices.find(
          (device) =>
            device.label.toLowerCase().includes("arka") ||
            device.label.toLowerCase().includes("back")
        );
        var cameraId = backCamera.id;

        if (cameraId) {
          html5QrCode
            .start(cameraId, config, qrCodeSuccessCallback)
            .then(() => {
              $(".qr-code-container").show();
              $(".close-btn").show();
              $("body").addClass("no-scroll");
            })
            .catch((err) => {
              Swal.fire({
                title: "Camera access or scanning failed",
                text: `${err}`,
                icon: "error",
              }).then((result) => {
                if (result.isConfirmed) {
                  resetSettings();
                }
              });
            });
        }
      }
    })
    .catch((err) => {
      Swal.fire({
        title: "Check the camera access of the browser you are using",
        text: `${err}`,
        icon: "error",
      });
    });
});

$(document).on("click", ".close-btn", resetSettings);
