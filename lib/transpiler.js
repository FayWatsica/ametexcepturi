var ts = require('typescript');
var logger_1 = require('./logger');
var utils_1 = require("./utils");
var logger = new logger_1.default({ debug: false });
var Transpiler = (function () {
    function Transpiler(host) {
        this._host = host;
        this._options = ts.clone(this._host.options);
        if (this._options.sourceMap === undefined)
            this._options.sourceMap = this._options.inlineSourceMap;
        if (this._options.sourceMap === undefined)
            this._options.sourceMap = true;
        this._options.inlineSourceMap = false;
        this._options.declaration = false;
        this._options.isolatedModules = true;
    }
    Transpiler.prototype.transpile = function (sourceName, source) {
        logger.debug("transpiling " + sourceName);
        var sourceFile = this._host.addFile(sourceName, source);
        var program = ts.createProgram([sourceName], this._options, this._host);
        var jstext = undefined;
        var maptext = undefined;
        var emitResult = program.emit(undefined, function (outputName, output) {
            if (utils_1.isJavaScript(outputName))
                jstext = output.slice(0, output.lastIndexOf("//#"));
            else if (utils_1.isSourceMap(outputName))
                maptext = output;
            else
                throw new Error("unexpected ouput file " + outputName);
        });
        var diagnostics = program.getSyntacticDiagnostics().concat(emitResult.diagnostics);
        return {
            failure: this.hasError(diagnostics),
            errors: diagnostics,
            js: jstext,
            sourceMap: maptext
        };
    };
    Transpiler.prototype.hasError = function (diags) {
        return diags.some(function (diag) { return (diag.category === ts.DiagnosticCategory.Error); });
    };
    return Transpiler;
})();
exports.Transpiler = Transpiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwaWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc3BpbGVyLnRzIl0sIm5hbWVzIjpbIlRyYW5zcGlsZXIiLCJUcmFuc3BpbGVyLmNvbnN0cnVjdG9yIiwiVHJhbnNwaWxlci50cmFuc3BpbGUiLCJUcmFuc3BpbGVyLmhhc0Vycm9yIl0sIm1hcHBpbmdzIjoiQUFDQSxJQUFZLEVBQUUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUVqQyx1QkFBbUIsVUFBVSxDQUFDLENBQUE7QUFDOUIsc0JBQXdDLFNBQVMsQ0FBQyxDQUFBO0FBRWxELElBQUksTUFBTSxHQUFHLElBQUksZ0JBQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBUzFDO0lBSUNBLG9CQUFZQSxJQUFrQkE7UUFDN0JDLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO1FBRWxCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFTQSxFQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUVwREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsS0FBS0EsU0FBU0EsQ0FBQ0E7WUFDekNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGVBQWVBLENBQUNBO1FBRXpEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxLQUFLQSxTQUFTQSxDQUFDQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFaENBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGVBQWVBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ3RDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxXQUFXQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNsQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZUFBZUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDdENBLENBQUNBO0lBRU1ELDhCQUFTQSxHQUFoQkEsVUFBaUJBLFVBQWtCQSxFQUFFQSxNQUFjQTtRQUNsREUsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsaUJBQWVBLFVBQVlBLENBQUNBLENBQUNBO1FBRTFDQSxJQUFJQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUN4REEsSUFBSUEsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFFeEVBLElBQUlBLE1BQU1BLEdBQVdBLFNBQVNBLENBQUNBO1FBQy9CQSxJQUFJQSxPQUFPQSxHQUFXQSxTQUFTQSxDQUFDQTtRQUdoQ0EsSUFBSUEsVUFBVUEsR0FBR0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsVUFBQ0EsVUFBVUEsRUFBRUEsTUFBTUE7WUFDM0RBLEVBQUVBLENBQUNBLENBQUNBLG9CQUFZQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDNUJBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEVBQUVBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxtQkFBV0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQTtZQUNsQkEsSUFBSUE7Z0JBQ0hBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLDJCQUF5QkEsVUFBWUEsQ0FBQ0EsQ0FBQUE7UUFDeERBLENBQUNBLENBQUNBLENBQUNBO1FBRUhBLElBQUlBLFdBQVdBLEdBQUdBLE9BQU9BLENBQUNBLHVCQUF1QkEsRUFBRUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFFbkZBLE1BQU1BLENBQUNBO1lBQ05BLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBO1lBQ25DQSxNQUFNQSxFQUFFQSxXQUFXQTtZQUNuQkEsRUFBRUEsRUFBRUEsTUFBTUE7WUFDVkEsU0FBU0EsRUFBRUEsT0FBT0E7U0FDbEJBLENBQUFBO0lBQ0ZBLENBQUNBO0lBRU9GLDZCQUFRQSxHQUFoQkEsVUFBaUJBLEtBQTJCQTtRQUMzQ0csTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQUEsSUFBSUEsSUFBSUEsT0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsS0FBS0EsRUFBRUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUEvQ0EsQ0FBK0NBLENBQUNBLENBQUFBO0lBQzNFQSxDQUFDQTtJQUNGSCxpQkFBQ0E7QUFBREEsQ0FBQ0EsQUFwREQsSUFvREM7QUFwRFksa0JBQVUsYUFvRHRCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAqL1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge0NvbXBpbGVySG9zdCwgQ29tYmluZWRPcHRpb25zfSBmcm9tICcuL2NvbXBpbGVyLWhvc3QnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge2lzSmF2YVNjcmlwdCwgaXNTb3VyY2VNYXB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmxldCBsb2dnZXIgPSBuZXcgTG9nZ2VyKHsgZGVidWc6IGZhbHNlIH0pO1xuXG5pbnRlcmZhY2UgVHJhbnNwaWxlUmVzdWx0IHtcblx0ZmFpbHVyZTogYm9vbGVhbjtcblx0ZXJyb3JzOiBBcnJheTx0cy5EaWFnbm9zdGljPjtcblx0anM6IHN0cmluZztcblx0c291cmNlTWFwOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFuc3BpbGVyIHtcblx0cHJpdmF0ZSBfaG9zdDogQ29tcGlsZXJIb3N0O1xuXHRwcml2YXRlIF9vcHRpb25zOiBDb21iaW5lZE9wdGlvbnM7XG5cblx0Y29uc3RydWN0b3IoaG9zdDogQ29tcGlsZXJIb3N0KSB7XG5cdFx0dGhpcy5faG9zdCA9IGhvc3Q7XG5cblx0XHR0aGlzLl9vcHRpb25zID0gKDxhbnk+dHMpLmNsb25lKHRoaXMuX2hvc3Qub3B0aW9ucyk7XG5cblx0XHRpZiAodGhpcy5fb3B0aW9ucy5zb3VyY2VNYXAgPT09IHVuZGVmaW5lZClcblx0XHRcdHRoaXMuX29wdGlvbnMuc291cmNlTWFwID0gdGhpcy5fb3B0aW9ucy5pbmxpbmVTb3VyY2VNYXA7XG5cblx0XHRpZiAodGhpcy5fb3B0aW9ucy5zb3VyY2VNYXAgPT09IHVuZGVmaW5lZClcblx0XHRcdHRoaXMuX29wdGlvbnMuc291cmNlTWFwID0gdHJ1ZTtcblxuXHRcdHRoaXMuX29wdGlvbnMuaW5saW5lU291cmNlTWFwID0gZmFsc2U7XG5cdFx0dGhpcy5fb3B0aW9ucy5kZWNsYXJhdGlvbiA9IGZhbHNlO1xuXHRcdHRoaXMuX29wdGlvbnMuaXNvbGF0ZWRNb2R1bGVzID0gdHJ1ZTtcblx0fVxuXG5cdHB1YmxpYyB0cmFuc3BpbGUoc291cmNlTmFtZTogc3RyaW5nLCBzb3VyY2U6IHN0cmluZyk6IFRyYW5zcGlsZVJlc3VsdCB7XG5cdFx0bG9nZ2VyLmRlYnVnKGB0cmFuc3BpbGluZyAke3NvdXJjZU5hbWV9YCk7XG5cblx0XHRsZXQgc291cmNlRmlsZSA9IHRoaXMuX2hvc3QuYWRkRmlsZShzb3VyY2VOYW1lLCBzb3VyY2UpO1xuXHRcdGxldCBwcm9ncmFtID0gdHMuY3JlYXRlUHJvZ3JhbShbc291cmNlTmFtZV0sIHRoaXMuX29wdGlvbnMsIHRoaXMuX2hvc3QpO1xuXG5cdFx0bGV0IGpzdGV4dDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXHRcdGxldCBtYXB0ZXh0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cblx0XHQvLyBFbWl0XG5cdFx0bGV0IGVtaXRSZXN1bHQgPSBwcm9ncmFtLmVtaXQodW5kZWZpbmVkLCAob3V0cHV0TmFtZSwgb3V0cHV0KSA9PiB7XG5cdFx0XHRpZiAoaXNKYXZhU2NyaXB0KG91dHB1dE5hbWUpKVxuXHRcdFx0XHRqc3RleHQgPSBvdXRwdXQuc2xpY2UoMCwgb3V0cHV0Lmxhc3RJbmRleE9mKFwiLy8jXCIpKTsgLy8gcmVtb3ZlIHNvdXJjZU1hcHBpbmdVUkxcblx0XHRcdGVsc2UgaWYgKGlzU291cmNlTWFwKG91dHB1dE5hbWUpKVxuXHRcdFx0XHRtYXB0ZXh0ID0gb3V0cHV0O1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYHVuZXhwZWN0ZWQgb3VwdXQgZmlsZSAke291dHB1dE5hbWV9YClcblx0XHR9KTtcblxuXHRcdGxldCBkaWFnbm9zdGljcyA9IHByb2dyYW0uZ2V0U3ludGFjdGljRGlhZ25vc3RpY3MoKS5jb25jYXQoZW1pdFJlc3VsdC5kaWFnbm9zdGljcyk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0ZmFpbHVyZTogdGhpcy5oYXNFcnJvcihkaWFnbm9zdGljcyksXG5cdFx0XHRlcnJvcnM6IGRpYWdub3N0aWNzLFxuXHRcdFx0anM6IGpzdGV4dCxcblx0XHRcdHNvdXJjZU1hcDogbWFwdGV4dFxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgaGFzRXJyb3IoZGlhZ3M6IEFycmF5PHRzLkRpYWdub3N0aWM+KTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIGRpYWdzLnNvbWUoZGlhZyA9PiAoZGlhZy5jYXRlZ29yeSA9PT0gdHMuRGlhZ25vc3RpY0NhdGVnb3J5LkVycm9yKSlcblx0fVxufVxuIl19