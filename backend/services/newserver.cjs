const app = require("./app.cjs");
//  ✅ Load questions module
require("./smry&cover.cjs"); // ✅ Load summary module

const PORT = process.env.PORT || 5000;

if (!module.parent) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}
