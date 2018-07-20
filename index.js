/* 
KeyScannerJS 
A library to detect automated keyboard events from external devices (such as a barcode scanner)
and differentiates between human keystroke inputs with a high level of accuracy.
This reader software, hence allows obtaining barcode information, without
the user having to focus the cursor on a textfield.
*/

const DEFAULT_CONFIG = {
  overall_percentage: 85,
  key_stroke_speed_ms: 0.017
};
export default class keyscanner {
  constructor(callback, config = DEFAULT_CONFIG) {
    this.callback = callback;
    this.timerHandle = 1;
    this.initListenHandler();
    this.BARCODE_THRESHOLD = config.key_stroke_speed_ms || DEFAULT_CONFIG.key_stroke_speed_ms;
    this.HUMAN_MACHINE_SPEED_THRESHOLD_PERCENTAGE =
      config.overall_percentage || DEFAULT_CONFIG.config.overall_percentage;
    return {
      stop: this.stop
    };
  }

  initListenHandler() {
    document.addEventListener('keydown', this.startListner, false);
    this.initBuffer();
  }

  stop = () => {
    document.removeEventListener('keydown', this.startListner, false);
  };

  logInfo = (key, timeStamp) => {
    if (!['Shift','Enter'].includes(key)) {
      this.timeStampBuffer.push(timeStamp);
      this.keyStrokeBuffer.push(key);
    }
  };

  startListner = event => {
    this.logInfo(event.key, event.timeStamp);
    clearTimeout(this.timerHandle);

    this.timerHandle = setTimeout(() => {
      const isBarcodeMachine = this.isBarcodeMachine();

      if (isBarcodeMachine) {
        const fetchBarcodeBuffer = this.fetchBarcodeBuffer();
        this.callback(fetchBarcodeBuffer);
      }
      this.initBuffer();
    }, 150);
  };

  initBuffer() {
    this.keyStrokeBuffer = [];
    this.timeStampBuffer = [];
  }

  timeDifference(timestamp1, timestamp2) {
    return (timestamp2 - timestamp1) / 1000;
  }

  fetchBarcodeBuffer() {
    return this.keyStrokeBuffer.join('');
  }

  isBarcodeMachine() {
    const bufferLength = this.timeStampBuffer.length - 1;
    let counter = 0;
    this.timeStampBuffer.forEach((timestamp, index) => {
      if (index <= bufferLength) {
        let diff = this.timeDifference(timestamp, this.timeStampBuffer[index + 1]);
        if (diff < this.BARCODE_THRESHOLD) {
          counter = counter + 1;
        }
      }
    });
    const achievedPercentage = (counter * 100) / bufferLength;
    return achievedPercentage > this.HUMAN_MACHINE_SPEED_THRESHOLD_PERCENTAGE;
  }
}
