"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTem = void 0;
const fs = require("fs");
const path = require("path");
class Template {
    constructor(_value) {
        this.value = _value;
    }
    replace(re) {
        let res = this.value;
        if (re) {
            Object.keys(re).forEach((key) => {
                res = res.replace(new RegExp(`\\$${key}`, 'g'), re[key]);
            });
        }
        return res;
    }
}
const createTem = async (_path) => {
    const fsPath = path.resolve(__dirname, _path);
    const _data = await fs.readFileSync(fsPath);
    let dataStr = _data.toString();
    dataStr = dataStr.replace('```ts', '').replace('```', '');
    return new Template(dataStr);
};
exports.createTem = createTem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlVGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZVRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5QkFBMEI7QUFDMUIsNkJBQThCO0FBRTlCLE1BQU0sUUFBUTtJQUNaLFlBQVksTUFBYztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBR0QsT0FBTyxDQUFDLEVBQTBCO1FBQ2hDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDckIsSUFBSSxFQUFFLEVBQUU7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUM5QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Q0FDRjtBQUVNLE1BQU0sU0FBUyxHQUFHLEtBQUssRUFDNUIsS0FBYSxFQUViLEVBQUU7SUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFNUMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRS9CLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRTFELE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBWlcsUUFBQSxTQUFTLGFBWXBCIn0=