class CountdownTimer {
  constructor(conf) {
    this.refs = {
      days: document.querySelector('span[data-value="days"]'),
      hours: document.querySelector('span[data-value="hours"]'),
      mins: document.querySelector('span[data-value="mins"]'),
      secs: document.querySelector('span[data-value="secs"]'),
    }
    
    this.startDate = conf.targetDate;
    this.timeId = null;
    this.timeLeft = null;  
  }

  calc = () => {
    let currentDate = Date.now();
    this.timeLeft = this.startDate - currentDate;
    
    if (this.timeLeft <= 0) return;

    this.refs.days.textContent = this.pad(Math.floor(this.timeLeft / (1000 * 60 * 60 * 24)));
    this.refs.hours.textContent = this.pad(Math.floor((this.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.refs.mins.textContent = this.pad(Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
    this.refs.secs.textContent = this.pad(Math.floor((this.timeLeft % (1000 * 60)) / 1000));
  }

  pad = (value) => {
    return String(value).padStart(2, '0');
  }
  
  timeStart = () => {
    this.timeId = setInterval(this.calc, 1000);
  }
};

export { CountdownTimer };