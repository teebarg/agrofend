import swal from "sweetalert";

export class Utility {
    static debounced = undefined;

  static getQueryParams (params) {
    if (typeof params === 'object') {
      let result = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
      return `?${result}`
    }
    return params
  }

  static debounce (func, time = 100) {
    clearTimeout(this.debounced)
    this.debounced = setTimeout(func, time)
  }

  static getBase64(file) {
    return new Promise(function (resolve, reject) {
      const read = new FileReader();
      read.onload = function () {
        resolve(String(read.result));
      };
      read.readAsDataURL(file);
    });
  }

  static showError(err){
    const { message } = err.response.data || "Please Contact Administrator";
    swal("Login Failed!", message, "error");
  }

  static showSuccess(){
    swal("Action Success!", "The Requested action was Successfull", "success");
  }
}
