"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuccess = void 0;
const isSuccess = (res, showToast = true) => {
    const success = res && (res === null || res === void 0 ? void 0 : res.code) === 0;
    if (!success && showToast) {
        if (res) {
            // toast.error(translateHandle(`http-error-${res.code}`));
        }
        else {
            // toast.error(translateHandle(`http-error-network`))
        }
    }
    return success;
};
exports.isSuccess = isSuccess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGlzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFjLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBRSxFQUFFO0lBQzVELE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxJQUFJLE1BQUssQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUyxFQUFFO1FBQ3pCLElBQUksR0FBRyxFQUFFO1lBQ1AsMERBQTBEO1NBQzNEO2FBQU07WUFDTCxxREFBcUQ7U0FDdEQ7S0FDRjtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQVZXLFFBQUEsU0FBUyxhQVVwQiJ9