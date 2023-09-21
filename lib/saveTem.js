"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTem = void 0;
const fs = require("fs");
const path = require("path");
const saveTem = async (_path, data, _option) => {
    const option = {
        replace: true,
        ...(_option || {}),
    };
    const fsPath = path.resolve(__dirname, _path);
    const parsedPath = path.parse(fsPath);
    if (!fs.existsSync(parsedPath.dir)) {
        fs.mkdirSync(parsedPath.dir);
    }
    if (!option.replace && fs.existsSync(fsPath)) {
        console.log(`file i exists: ${_path}`);
        return;
    }
    fs.writeFile(fsPath, data, (error) => {
        console.log(error);
    });
    // const _data = await fs.readFileSync(fsPath);
};
exports.saveTem = saveTem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zYXZlVGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlCQUEwQjtBQUMxQiw2QkFBOEI7QUFLdkIsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUMxQixLQUFhLEVBQ2IsSUFBWSxFQUNaLE9BQWlCLEVBQ2pCLEVBQUU7SUFDRixNQUFNLE1BQU0sR0FBRztRQUNiLE9BQU8sRUFBRSxJQUFJO1FBQ2IsR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDbkIsQ0FBQztJQUNGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTlDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xDLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU87S0FDUjtJQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDSCwrQ0FBK0M7QUFDakQsQ0FBQyxDQUFDO0FBdkJXLFFBQUEsT0FBTyxXQXVCbEIifQ==