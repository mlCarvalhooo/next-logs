class LogMessage {
    constructor(time, message) {
      this.time = time;
      this.message = message;
    }
  
    getTime(){
        return this.time;
    }

    getMessage(){
        return this.message;
    }
    
}

module.exports = LogMessage;