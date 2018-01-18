/*
 * GPII Untrusted Flow Manager Development Tests
 *
 * Copyright 2015 OCAD University
 *
 * Licensed under the New BSD license. You may not use this file except in
 * compliance with this License.
 *
 * The research leading to these results has received funding from the European Union's
 * Seventh Framework Programme (FP7/2007-2013)
 * under grant agreement no. 289016.
 *
 * You may obtain a copy of the License at
 * https://github.com/GPII/universal/blob/master/LICENSE.txt
 */

"use strict";

var fluid = require("infusion"),
    gpii = fluid.registerNamespace("gpii"),
    kettle = fluid.registerNamespace("kettle");

fluid.require("%universal");
require("./shared/DevelopmentTestDefs.js");

gpii.loadTestingSupport();

fluid.registerNamespace("gpii.tests.untrusted.development");

// The test pouchdb data is from %universal/tests/platform/cloud/dbData/*.json
gpii.tests.untrusted.development.testDefs = fluid.transform(gpii.tests.development.testDefs, function (testDefIn) {
    var testDef = fluid.extend(true, {}, testDefIn, {
        config: {
            configName: "gpii.config.untrusted.development.local.json",
            configPath: "%universal/gpii/configs"
        }
    });

    testDef.gradeNames.push("gpii.test.pouch.pouchTestCaseHolder");

    testDef.sequence = gpii.test.pouch.addConstructFixturesToSequence(testDef.sequence);
    return testDef;
});

kettle.test.bootstrapServer(gpii.tests.untrusted.development.testDefs);
