const ERR_CODE = -1;
const SUCC_CODE = 0;

class Result {
    constructor(data, msg = '操作成功', options) {
        this.data = null;
        if (arguments.length === 0) {
            this.msg = '操作成功';
        } else if (arguments.length === 1) {
            this.msg = data;
        } else {
            this.data = data;
            this.msg = msg;
            if (options) {
                this.options = options;
            }
        }
    }
    json() {
        return this.createResult();
    }
    createResult() {
        if (!this.code) {
            this.code = SUCC_CODE;
        }
        let base = {
            code: this.code,
            msg: this.msg,
        };

        if (this.data) {
            base.data = this.data;
        }
        if (this.options) {
            base = { ...base, ...this.options };
        }
        return base;
    }
    success() {
        this.code = SUCC_CODE;
        return this.json();
    }
    fail(code) {
        this.code = code || ERR_CODE;
        return this.json();
    }
}

module.exports = Result;