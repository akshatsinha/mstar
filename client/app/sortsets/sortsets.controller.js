'use strict';

angular.module('mstarApp')
    .value('_', window._)
    .controller('SortsetsCtrl', function (_, $sce, EventDispatchingSvc, ajaxSvc, $scope, $timeout) {
        var sc = this;
        sc.showCreateSortSetPopup = false;
        sc.dropdownStatus = false;
        sc.sortCriteriaDisabled = true;
        sc.newSortCriteriaDropdownTitle = 'NEW SORT CRITERIA';
        sc.items = [];
        sc.saveClick = 0;
        angular.extend(sc, new EventDispatchingSvc($scope));
        var sort_rules = [];

        function printResult(result){
            console.log(result);
        }

        sc.resetForm = function() {
            console.log('resetForm');
            sc.showCreateSortSetPopup = false;
            sc.modalStyle = "display: none";
            sc.getSortSetModalStyle = "display: none";
            window.location.reload();
        };

        sc.createSortSet = function() {
            console.log('createSortSet');
            sc.showCreateSortSetPopup = true;
            sc.modalStyle = "display: block";
            sc.getSortSetModalStyle = "display: none";
        };

        sc.sortableOptions = {
            stop: function(e, ui) {
                console.log(sc.items);
            }
        };

        sc.saveSortSet = function() {
            sc.saveClick += 1;
            console.log('saveSortSet');

            // console.log(sc.items);
            _(sc.items).forEach(function (elem) {
                console.log(elem);
                if (elem.id == "1") {
                    // 1 --> Asset Type
                    sc.dispatch('requestassetdata', '');
                    sc.listen('responseassetdata', function (event, assetdata) {
                        sort_rules.push({'sort_field_id': '1', 'sort_macros': assetdata});
                        console.log(sort_rules);
                    });
                } else if (elem.id == "6") {
                    // 6 --> RUN NUMBER
                    sc.dispatch('requestrunnumberdata', '');
                    sc.listen('responserunnumberdata', function (event, runnumberdata) {
                        sort_rules.push({'sort_field_id': '6', 'sort_macros': runnumberdata});
                        console.log(sort_rules);
                    });
                } else if (elem.id == "7") {
                    // 7 --> SELLER CODE
                    sc.dispatch('requestsellercodedata', '');
                    sc.listen('responsesellercodedata', function (event, sellercodedata) {
                        sort_rules.push({'sort_field_id': '7', 'sort_macros': sellercodedata});
                        console.log(sort_rules);
                    });
                } else if (elem.id == "9") {
                    // 9 --> STATUS
                    sc.dispatch('requeststatusdata', '');
                    sc.listen('responsestatusdata', function (event, statusdata) {
                        sort_rules.push({'sort_field_id': '9', 'sort_macros': statusdata});
                        console.log(sort_rules);
                    });
                } else if (elem.id == "10") {
                    // 10 --> ZOLTAR SCORE
                    sc.dispatch('requestzoltardata', '');
                    sc.listen('responsezoltardata', function (event, zoltardata) {
                        sort_rules.push({'sort_field_id': '10', 'sort_macros': zoltardata});
                        console.log(sort_rules);
                    });
                } else if (elem.id == "11") {
                    // 11 --> STARTBID SCORE
                    sc.dispatch('requeststartbiddata', '');
                    sc.listen('responsestartbiddata', function (event, startbiddata) {
                        sort_rules.push({'sort_field_id': '11', 'sort_macros': startbiddata});
                        console.log(sort_rules);
                    });
                } else if (elem.id == "12") {
                    // 12 --> DAYS TO AUCTION
                    sc.dispatch('requestdtacdata', '');
                    sc.listen('responsedtacdata', function (event, dtacdata) {
                        sort_rules.push({'sort_field_id': '12', 'sort_macros': dtacdata});
                        console.log(sort_rules);
                    });
                }
            });

            var newSortSetObj = {
                'sort_set_name': sc.sortsetName,
                'sort_container_id': '2',
                'sort_rules': sort_rules
            };

            //console.log(newSortSetObj);

            // var setReq = JSON.stringify({
            //     "sort_set_name":"Custom Sort 1", "sort_container_id":"2",
            //     "sort_rules": [
            //         {
            //             "sort_field_id":"2",
            //             "sort_macros":[
            //                 {"range_type":"","value":"BFY","value_two":"", "sort_type":""},
            //                 {"range_type":"","value":"WFP","value_two":"", "sort_type":""}
            //             ]
            //         },
            //         {
            //             "sort_field_id":"3",
            //             "sort_macros":[
            //                 {"range_type":"0","value":"1","value_two":"5", "sort_type":"1"},
            //                 {"range_type":"1","value":"1","value_two":"", "sort_type":"0"}
            //             ]
            //         }
            //     ]
            // });
            // console.log(setReq);
            // callService("SortSet", "insert", encodeURIComponent(setReq), printResult);
            // callService("SortSet", "get", encodeURIComponent('{"fxn":"FULL","constraints":"ID","sort_set_id":"23"}'), printResult);
            // function printResult(result){
            //     console.log(result);
            // }


            if (sc.saveClick == 2) {
                var setReq = JSON.stringify(newSortSetObj);
                ajaxSvc.callService("SortSet", "insert", encodeURIComponent(setReq), printResult)
                    .then(function (response) {
                        console.log(response);
                        sc.resetForm();
                    });
            }
        };

        sc.showSavedSortSet = function(sa) {
            console.log(sa);
            ajaxSvc.callService("SortSet", "get", encodeURIComponent('{"fxn":"FULL","constraints":"ID","sort_set_id":"' + sa.sort_set_id + '"}'), printResult)
                .then(function (response) {
                    console.log(response.data.result);
                    sc.fetchedSortSet = response.data.result;
                    sc.fetchedSortSetName = sc.fetchedSortSet.sort_set_name;
                    sc.getSortSetModalStyle = "display: block";
                });
        }

        sc.getSavedSortSets = function() {
            console.log('getSavedSortSets');
            ajaxSvc.callService("SortSet", "get", encodeURIComponent('{"sort_set_sort_container_id_fk":"2","constraints":"CONT","sort_set_id":"","fxn":""}'), printResult)
                .then(function(response) {
                    sc.savedAssets = response.data.result;
                });
        };

        sc.toggleNewSortCriteriaDropdown = function() {
            console.log('toggleNewSortCriteriaDropdown');
            sc.dropdownStatus = !sc.dropdownStatus;
        };

        sc.selectNewSortCriteria = function(selectedItemID, selectedItemName) {
            console.log('selectNewSortCriteria: ', selectedItemID);
            sc.sortCriteriaDisabled = false;
            sc.newSortCriteriaDropdownTitle = selectedItemName;
            sc.selectedItemID = selectedItemID;
        };


        sc.addNewSort = function() {
            console.log('addNewSort');
            _(sc.sortCriteria).forEach(function (elem) {
                console.log(sc.items);
                if (elem.id === sc.selectedItemID) {
                    sc.items.push(elem);
                    sc.sortCriteria = _.without(sc.sortCriteria, elem);
                    sc.newSortCriteriaDropdownTitle = 'NEW SORT CRITERIA';
                    sc.sortCriteriaDisabled = true;
                }
            });
        };

        sc.sortCriteria = [
            {id: '1', field:"ASSET TYPE"},
            {id: '6', field:"RUN NUMBER"},
            {id: '7', field:"SELLER CODE"},
            {id: '9', field:"STATUS"},
            {id: '10', field:"ZOLTAR SCORE"},
            {id: '11', field:"STARTING BID"},
            {id: '12', field:"DAYS TO AUCTION"}
        ];
    })
    .controller('SellerCodeCtrl', function (EventDispatchingSvc, $scope) {
        var scc = this;
        scc.dropdownStatus = false;
        scc.selectedSellerCode = 'Select Seller Code';
        scc.sellerCodeAddDisabled = true;
        scc.sellerCodes = [];

        angular.extend(scc, new EventDispatchingSvc($scope));
        scc.listen('requestsellercodedata', function (event, sellercode) {
            var sort_macro = [];
            _(scc.sellerCodes).forEach(function (elem) {
                sort_macro.push({'range_type': '', 'value': elem, 'value_two': '', 'sort_type': ''});
            });
            scc.dispatch('responsesellercodedata', sort_macro);
        });

        scc.sortableOptions = {
            update: function(e, ui) {
                console.log('update');
            }
        };

        scc.toggleSellerCodeDropdown = function() {
            scc.dropdownStatus = !scc.dropdownStatus;
        };

        scc.selectNewSellerCode = function(sellerCode) {
            scc.sellerCodeAddDisabled = false;
            scc.selectedSellerCode = sellerCode;
        };

        scc.removeSelectedSellerCode = function(removedSellerCode) {
            scc.sellerCodes = _.without(scc.sellerCodes, removedSellerCode);
            scc.sellerCodeOptions.push(removedSellerCode);
            scc.sellerCodeOptions = _.sortBy(scc.sellerCodeOptions);
        };

        scc.addNewSellerCode = function() {
            console.log('addNewSellerCode: ', scc.selectedSellerCode);
            _(scc.sellerCodeOptions).forEach(function (elem) {
                if (elem === scc.selectedSellerCode) {
                    scc.sellerCodes.push(scc.selectedSellerCode);
                    scc.sellerCodeOptions = _.without(scc.sellerCodeOptions, scc.selectedSellerCode);
                    scc.selectedSellerCode = 'Select Seller Code';
                    scc.sellerCodeAddDisabled = true;
                }
            });
        };

        scc.sellerCodeOptions = [ "211", "3ML", "400", "505", "639", "AAA", "ABH", "ABJ", "ACL",
            "AHT", "AKI", "APO", "ARZ", "ASF", "ATO", "AVO", "BAH", "BAT", "BBK", "BBL", "BCV", "BDA",
            "BDB", "BDN", "BDU", "BDX", "BDY", "BDZ", "BEM", "BFS", "BHE", "BHN", "BHY", "BKH", "BKM",
            "BMN", "BNX", "BOP", "BOR", "BOT", "BOZ", "BR3", "BRD", "BRV", "BSH", "BSM", "BTO", "BTT",
            "BV5", "BV6", "BV7", "BV8", "BVA", "BVB", "BVF", "BVH", "BVM", "BVN", "BVT", "BVV", "BVZ",
            "BXA", "BYD", "BYK", "BYQ", "BYR", "BYV", "BYZ", "C2O", "C2V", "CAH", "CAL", "CBY", "CCA",
            "CDD", "CFH", "CFO", "CGT", "CH1", "CH2", "CH3", "CHG", "CIH", "CKD", "CKH", "CMA", "CMF",
            "CMO", "CMT", "COH", "CPG", "CRG", "CRN", "CRP", "CS6", "CS7", "CS8", "CSO", "CSV", "CUS",
            "CV6", "CV7", "CV8", "CVE", "CVS", "DAS", "DDH", "DLM", "DMD", "DPA", "DRV", "DUW", "EBH",
            "EEC", "EHV", "ELL", "ELV", "EMR", "EOT", "ERE", "EXP", "FAT", "FDV", "FMM", "FMT", "FN2",
            "FN3", "FNB", "FNM", "FNR", "FNS", "FNU", "FNY", "FNZ", "FPR", "FRD", "FRF", "FRM", "FRN",
            "FRT", "FSM", "FVL", "FZA", "FZN", "GAR", "GDE", "GOV", "GRA", "GTT", "HAI", "HBO", "HCL",
            "HGR", "HLV", "HMR", "HNR", "HRE", "HRR", "HYX", "INH", "INN", "ISR", "ISV", "IVH", "JAC",
            "JAK", "JB1", "JB2", "JBM", "JFH", "JFM", "JHN", "JHV", "JI2", "JI6", "JIO", "JJJ", "JM2",
            "JM6", "JMO", "JO3", "JOI", "JOM", "JP6", "JPH", "JPO", "JPS", "JPT", "JPU", "JPZ", "JTL",
            "JUO", "JUP", "JUY", "JUZ", "JV4", "JV7", "JV8", "JVK", "JVZ", "JWV", "KBE", "KLL", "KOR",
            "KSR", "KWR", "KYP", "L21", "LBI", "LCP", "LCR", "LHO", "LHV", "LJL", "LLP", "LLV", "LMI",
            "LNC", "LOV", "LPA", "LPO", "LPP", "LRV", "LTA", "LTV", "MAR", "MCA", "MEP", "MF3", "MF4",
            "MF6", "MF7", "MF8", "MFH", "MFO", "MFV", "MHB", "MKH", "MKR", "MKS", "MKT", "MKZ", "MNL",
            "MNO", "MO1", "MOG", "MPB", "MRH", "MSV", "MTG", "MTH", "MV1", "MVS", "MWV", "MYO", "NAW",
            "NBK", "NCT", "NFH", "NFM", "NFT", "NGL", "NKM", "NLL", "NOP", "NR3", "NR4", "NR5", "NR6",
            "NRG", "NRH", "NRV", "NSH", "NT2", "NTB", "NTR", "NTT", "NV2", "NV5", "NV6", "NV8", "NVB",
            "NWF", "NWH", "OCF", "OCH", "OCK", "OCT", "OHA", "OJL", "ONJ", "ORC", "OWB", "PBD", "PHC",
            "PJC", "PKH", "PL1", "PL3", "PL4", "PL5", "PL6", "PL8", "PMH", "PMK", "PMT", "PNH", "PNO",
            "PO1", "PV1", "QKH", "QUH", "QUT", "RAT", "RCC", "RDV", "REX", "RHV", "RJM", "RMH", "RMP",
            "RMT", "RPM", "RPO", "RPT", "RRT", "RRW", "RSP", "RST", "RTV", "RUB", "RYP", "RZV", "S16",
            "SBO", "SCZ", "SEH", "SEI", "SET", "SFH", "SFT", "SHP", "SIP", "SIS", "SIT", "SJS", "SKH",
            "SLD", "SLM", "SLN", "SLT", "SMA", "SMF", "SMO", "SMS", "SNI", "SOS", "SPC", "SPK", "SPN",
            "SRK", "SRO", "SSM", "ST2", "SUH", "SV1", "SVC", "SVF", "SVN", "SVS", "TAR", "TCM", "TEX",
            "TGB", "TJH", "TRD", "TRF", "TRO", "TTL", "TTN", "TTT", "TWD", "TWP", "UFH", "UOA", "US7",
            "US8", "USH", "USO", "USP", "USV", "VER", "VLC", "VNH", "VPV", "VTC", "WAV", "WDR", "WEC",
            "WEV", "WF1", "WF9", "WFH", "WFL", "WFM", "WFP", "WFT", "WFZ", "WIR", "WKE", "WTW", "WV1",
            "WV5", "WV6", "WV7", "WV8", "WV9", "WVA", "WVZ", "ZSV"];
    })
    .controller('AssetTypeCtrl', function (EventDispatchingSvc, $scope) {
        var atc = this;
        atc.assetTypes = [];
        atc.dropdownStatus = false;
        atc.assetTypeAddDisabled = true;
        atc.selectedAssetType = 'Select Asset Type';
        atc.lob = 0;

        angular.extend(atc, new EventDispatchingSvc($scope));
        atc.listen('requestassetdata', function (event, asset) {
            var sort_macro = [];
            _(atc.assetTypes).forEach(function (elem) {
                sort_macro.push({'range_type': '', 'value': elem, 'value_two': '', 'sort_type': ''});
            });
            atc.dispatch('responseassetdata', sort_macro);
        });

        atc.sortableOptions = {
            update: function(e, ui) {
                console.log('update');
            }
        };

        atc.addNewAssetType = function() {
            console.log('addNewAssetType: ', atc.selectedAssetType);
            _(atc.assetTypeOptions[atc.aTMap[atc.lob]]).forEach(function (elem) {
                if (elem === atc.selectedAssetType) {
                    atc.assetTypes.push(atc.selectedAssetType);
                    atc.assetTypeOptions[atc.aTMap[atc.lob]] = _.without(atc.assetTypeOptions[atc.aTMap[atc.lob]], atc.selectedAssetType);
                    console.log(atc.assetTypeOptions[atc.aTMap[atc.lob]], elem, atc.selectedAssetType);
                    atc.selectedAssetType = 'Select Asset Type';
                    atc.assetTypeAddDisabled = true;
                }
            });
        };

        atc.closeATDropdown = function() {
            atc.dropdownStatus = false;
            atc.assetTypes = [];
        };

        atc.toggleAssetTypeDropdown = function() {
            //atc.assetTypeOptions = atc.lob == 0 ? atc.assetTypeOptionsOriginal.resi : atc.assetTypeOptionsOriginal.cre;
            atc.dropdownStatus = !atc.dropdownStatus;
        };

        atc.selectNewAssetType = function(assetType) {
            console.log('selectNewAssetType');
            atc.assetTypeAddDisabled = false;
            atc.selectedAssetType = assetType;
        };

        atc.aTMap = {0: 'resi', 1: 'cre'};

        atc.removeSelectedAssetType = function(removedAssetType) {
            atc.assetTypes = _.without(atc.assetTypes, removedAssetType);
            atc.assetTypeOptions[atc.aTMap[atc.lob]].push(removedAssetType);
            atc.assetTypeOptions[atc.aTMap[atc.lob]] = _.sortBy(atc.assetTypeOptions[atc.aTMap[atc.lob]]);
        };

        atc.assetTypeOptions = {
            resi : ["Bank Owned", "Foreclosure/Trustee", "Income Producing", "Private Seller - Institutional", "Short Sale"],
            cre: ["Agricultural", "CO-OP (Fee Simple)", "Flex", "Healthcare", "Hotel", "Industrial", "Industrial/Condo",
                "Industrial/Office", "Land Only", "Lodging", "Medical Office", "Mixed-Use", "Mobile Home Park",
                "Motel", "Multi-Family", "Office", "Office/Condo", "Parking Garage", "R&D Industrial", "Residential",
                "Retail", "Self-Storage", "Senior Housing", "Shopping Center", "Special Purpose", "Sports/Entertainment"]
        };
    })
    .controller('StatusCtrl', function (EventDispatchingSvc, $scope) {
        var status = this;
        status.statusTypes = [];
        status.dropdownStatus = false;
        status.selectedStatusType = 'Select Status Type';
        status.statusTypeAddDisabled = true;

        angular.extend(status, new EventDispatchingSvc($scope));
        status.listen('requeststatusdata', function (event, statusdata) {
            var sort_macro = [];
            _(status.statusTypes).forEach(function (elem) {
                sort_macro.push({'range_type': '', 'value': elem, 'value_two': '', 'sort_type': ''});
            });
            status.dispatch('responsestatusdata', sort_macro);
        });

        status.sortableOptions = {
            update: function(e, ui) {
                console.log('update');
            }
        };

        status.addNewStatusType = function() {
            console.log('addNewStatusType: ', status.selectedStatusType);
            _(status.statusTypeOptions).forEach(function (elem) {
                if (elem === status.selectedStatusType) {
                    status.statusTypes.push(status.selectedStatusType);
                    status.statusTypeOptions = _.without(status.statusTypeOptions, status.selectedStatusType);
                    status.selectedStatusType = 'Select Status Type';
                    status.statusTypeAddDisabled = true;
                }
            });
        };

        status.selectNewStatusType = function(statusType) {
            console.log('selectNewStatusType');
            status.statusTypeAddDisabled = false;
            status.selectedStatusType = statusType;
        };

        status.toggleStatusTypeDropdown = function() {
            status.dropdownStatus = !status.dropdownStatus;
        };


        status.removeSelectedStatusType = function(removedStatusType) {
            console.log('removeSelectedStatusType');
            status.statusTypes = _.without(status.statusTypes, removedStatusType);
            status.statusTypeOptions.push(removedStatusType);
            status.statusTypeOptions = _.sortBy(status.statusTypeOptions);
        };


        status.statusTypeOptions = ["Auction", "Cancelled", "Postponed", "Sold Presale"];
    })
    .controller('RunNumberCtrl', function (EventDispatchingSvc, $scope) {
        var rnc = this;
        rnc.rangeTypes = [];
        rnc.dropdownStatus = false;
        rnc.rangeTypeAddDisabled = true;
        rnc.selectedRangeType = 'Select Range';

        angular.extend(rnc, new EventDispatchingSvc($scope));
        rnc.listen('requestrunnumberdata', function (event, runnumberdata) {
            var sort_macro = [];
            _(rnc.rangeTypes).forEach(function (elem) {
                if (elem.id == "1") {
                    // BETWEEN --> {"range_type":"0","value":"1","value_two":"5", "sort_type":"1"},
                    sort_macro.push({'range_type': '1', 'value': rnc.between_r1, 'value_two': rnc.between_r2, 'sort_type': rnc.sortMap[rnc.betn_orderby]});
                } else if (elem.id == "2") {
                    // LESS THAN --> {"range_type":"1","value":"1","value_two":"", "sort_type":"0"}
                    sort_macro.push({'range_type': '2', 'value': rnc.lessthan_r1, 'value_two': "", 'sort_type': rnc.sortMap[rnc.lessthan_orderby]});
                } else if (elem.id == "3") {
                    // GREATER THAN --> {"range_type":"2","value":"1","value_two":"", "sort_type":"0"}
                    sort_macro.push({'range_type': '3', 'value': rnc.greaterthan_r1, 'value_two': "", 'sort_type': rnc.sortMap[rnc.greaterthan_orderby]});
                }
            });
            rnc.dispatch('responserunnumberdata', sort_macro);
        });
        rnc.sortMap = {'ASC': '1', 'DSC': '2', 'RND': '3'};

        rnc.sortableOptions = {
            update: function(e, ui) {
                console.log('update');
            }
        };
        rnc.sortTypes = ['ASC', 'DSC', 'RND'];
        rnc.betn_orderby = rnc.sortTypes[0];
        rnc.lessthan_orderby = rnc.sortTypes[0];
        rnc.greaterthan_orderby = rnc.sortTypes[0];

        rnc.rangeOptions = [
            {id: '1', type:"Between", inputs:2, value:0},
            {id: '2', type:"Less Than", inputs: 1, value:1},
            {id: '3', type:"Greater Than", inputs: 1, value:2}
        ];

        rnc.addNewRangeType = function() {
            console.log('addNewRangeType: ', rnc.selectedRangeType);
            _(rnc.rangeOptions).forEach(function (elem) {
                if (elem.id == rnc.selectedRangeId) {
                    rnc.rangeTypes.push(elem);
                    rnc.rangeOptions = _.without(rnc.rangeOptions, elem);
                    rnc.selectedRangeType = 'Select Range';
                    rnc.rangeTypeAddDisabled = true;
                    if (elem.id == 1) {
                        elem.range_type = "1";
                        rnc.between_r1 = '';
                        rnc.between_r2 = '';
                    } else if (elem.id == 2) {
                        rnc.lessthan_r1 = '';
                    } else if (elem.id == 3) {
                        rnc.greaterthan_r1 = '';
                    }
                }
            });
        };

        rnc.selectNewRangeType = function(rangeType) {
            console.log('selectNewOperation');
            rnc.rangeTypeAddDisabled = false;
            rnc.selectedRangeType = rangeType.type;
            rnc.selectedRangeId = rangeType.id;
        };

        rnc.toggleStatusTypeDropdown = function() {
            rnc.dropdownStatus = !rnc.dropdownStatus;
        };

        rnc.removeSelectedRangeType = function(rangeType) {
            console.log('removeSelectedOperation: ', rangeType);
            _(rnc.rangeTypes).forEach(function (elem) {
                if (elem.id == rangeType.id) {
                    rnc.rangeTypes = _.without(rnc.rangeTypes, rangeType);
                    rnc.rangeOptions.push(rangeType);
                }
            });
        };

    })
    .controller('ZoltarCtrl', function (EventDispatchingSvc, $scope) {
        var zc = this;
        zc.rangeTypes = [];
        zc.dropdownStatus = false;
        zc.rangeTypeAddDisabled = true;
        zc.selectedRangeType = 'Select Range';

        angular.extend(zc, new EventDispatchingSvc($scope));
        zc.listen('requestzoltardata', function (event, zoltardata) {
            var sort_macro = [];
            _(zc.rangeTypes).forEach(function (elem) {
                if (elem.id == "1") {
                    // BETWEEN --> {"range_type":"0","value":"1","value_two":"5", "sort_type":"1"},
                    sort_macro.push({'range_type': '1', 'value': zc.between_r1, 'value_two': zc.between_r2, 'sort_type': zc.sortMap[zc.betn_orderby]});
                } else if (elem.id == "2") {
                    // LESS THAN --> {"range_type":"1","value":"1","value_two":"", "sort_type":"0"}
                    sort_macro.push({'range_type': '2', 'value': zc.lessthan_r1, 'value_two': "", 'sort_type': zc.sortMap[zc.lessthan_orderby]});
                } else if (elem.id == "3") {
                    // GREATER THAN --> {"range_type":"2","value":"1","value_two":"", "sort_type":"0"}
                    sort_macro.push({'range_type': '3', 'value': zc.greaterthan_r1, 'value_two': "", 'sort_type': zc.sortMap[zc.greaterthan_orderby]});
                }
            });
            zc.dispatch('responsezoltardata', sort_macro);
        });
        zc.sortMap = {'ASC': '1', 'DSC': '2', 'RND': '3'};

        zc.sortableOptions = {
            update: function(e, ui) {
                console.log('update');
            }
        };
        zc.sortTypes = ['ASC', 'DSC', 'RND'];
        zc.betn_orderby = zc.sortTypes[0];
        zc.lessthan_orderby = zc.sortTypes[0];
        zc.greaterthan_orderby = zc.sortTypes[0];

        zc.rangeOptions = [
            {id: '1', type:"Between", inputs:2, value:0},
            {id: '2', type:"Less Than", inputs: 1, value:1},
            {id: '3', type:"Greater Than", inputs: 1, value:2}
        ];

        zc.addNewRangeType = function() {
            console.log('addNewRangeType: ', zc.selectedRangeType);
            _(zc.rangeOptions).forEach(function (elem) {
                if (elem.id == zc.selectedRangeId) {
                    zc.rangeTypes.push(elem);
                    zc.rangeOptions = _.without(zc.rangeOptions, elem);
                    zc.selectedRangeType = 'Select Range';
                    zc.rangeTypeAddDisabled = true;
                    if (elem.id == 1) {
                        zc.between_r1 = '';
                        zc.between_r2 = '';
                    } else if (elem.id == 2) {
                        zc.lessthan_r1 = '';
                    } else if (elem.id == 3) {
                        zc.greaterthan_r1 = '';
                    }
                }
            });
        };

        zc.selectNewRangeType = function(rangeType) {
            console.log('selectNewOperation');
            zc.rangeTypeAddDisabled = false;
            zc.selectedRangeType = rangeType.type;
            zc.selectedRangeId = rangeType.id;
        };

        zc.toggleStatusTypeDropdown = function() {
            zc.dropdownStatus = !zc.dropdownStatus;
        };

        zc.removeSelectedRangeType = function(rangeType) {
            console.log('removeSelectedOperation: ', rangeType);
            _(zc.rangeTypes).forEach(function (elem) {
                if (elem.id == rangeType.id) {
                    zc.rangeTypes = _.without(zc.rangeTypes, rangeType);
                    zc.rangeOptions.push(rangeType);
                }
            });
        };
    })


    .controller('StartBidCtrl', function (EventDispatchingSvc, $scope) {
        var sbc = this;
        sbc.rangeTypes = [];
        sbc.dropdownStatus = false;
        sbc.rangeTypeAddDisabled = true;
        sbc.selectedRangeType = 'Select Range';

        angular.extend(sbc, new EventDispatchingSvc($scope));
        sbc.listen('requeststartbiddata', function (event, zoltardata) {
            var sort_macro = [];
            _(sbc.rangeTypes).forEach(function (elem) {
                if (elem.id == "1") {
                    // BETWEEN --> {"range_type":"0","value":"1","value_two":"5", "sort_type":"1"},
                    sort_macro.push({'range_type': '1', 'value': sbc.between_r1, 'value_two': sbc.between_r2, 'sort_type': sbc.sortMap[sbc.betn_orderby]});
                } else if (elem.id == "2") {
                    // LESS THAN --> {"range_type":"1","value":"1","value_two":"", "sort_type":"0"}
                    sort_macro.push({'range_type': '2', 'value': sbc.lessthan_r1, 'value_two': "", 'sort_type': sbc.sortMap[sbc.lessthan_orderby]});
                } else if (elem.id == "3") {
                    // GREATER THAN --> {"range_type":"2","value":"1","value_two":"", "sort_type":"0"}
                    sort_macro.push({'range_type': '3', 'value': sbc.greaterthan_r1, 'value_two': "", 'sort_type': sbc.sortMap[sbc.greaterthan_orderby]});
                }
            });
            sbc.dispatch('responsestartbiddata', sort_macro);
        });
        sbc.sortMap = {'ASC': '1', 'DSC': '2', 'RND': '3'};

        sbc.sortableOptions = {
            update: function(e, ui) {
                console.log('update');
            }
        };
        sbc.sortTypes = ['ASC', 'DSC', 'RND'];
        sbc.betn_orderby = sbc.sortTypes[0];
        sbc.lessthan_orderby = sbc.sortTypes[0];
        sbc.greaterthan_orderby = sbc.sortTypes[0];

        sbc.rangeOptions = [
            {id: '1', type:"Between", inputs:2, value:0},
            {id: '2', type:"Less Than", inputs: 1, value:1},
            {id: '3', type:"Greater Than", inputs: 1, value:2}
        ];

        sbc.addNewRangeType = function() {
            console.log('addNewRangeType: ', sbc.selectedRangeType);
            _(sbc.rangeOptions).forEach(function (elem) {
                if (elem.id == sbc.selectedRangeId) {
                    sbc.rangeTypes.push(elem);
                    sbc.rangeOptions = _.without(sbc.rangeOptions, elem);
                    sbc.selectedRangeType = 'Select Range';
                    sbc.rangeTypeAddDisabled = true;
                    if (elem.id == 1) {
                        sbc.between_r1 = '';
                        sbc.between_r2 = '';
                    } else if (elem.id == 2) {
                        sbc.lessthan_r1 = '';
                    } else if (elem.id == 3) {
                        sbc.greaterthan_r1 = '';
                    }
                }
            });
        };

        sbc.selectNewRangeType = function(rangeType) {
            console.log('selectNewOperation');
            sbc.rangeTypeAddDisabled = false;
            sbc.selectedRangeType = rangeType.type;
            sbc.selectedRangeId = rangeType.id;
        };

        sbc.toggleStatusTypeDropdown = function() {
            sbc.dropdownStatus = !sbc.dropdownStatus;
        };

        sbc.removeSelectedRangeType = function(rangeType) {
            console.log('removeSelectedOperation: ', rangeType);
            _(sbc.rangeTypes).forEach(function (elem) {
                if (elem.id == rangeType.id) {
                    sbc.rangeTypes = _.without(sbc.rangeTypes, rangeType);
                    sbc.rangeOptions.push(rangeType);
                }
            });
        };
    })
    .controller('DaysToAuctionCtrl', function (EventDispatchingSvc, $scope) {
        var dtac = this;
        dtac.rangeTypes = [];
        dtac.dropdownStatus = false;
        dtac.rangeTypeAddDisabled = true;
        dtac.selectedRangeType = 'Select Range';

        angular.extend(dtac, new EventDispatchingSvc($scope));
        dtac.listen('requestdtacdata', function (event, zoltardata) {
            var sort_macro = [];
            _(dtac.rangeTypes).forEach(function (elem) {
                if (elem.id == "1") {
                    // BETWEEN --> {"range_type":"0","value":"1","value_two":"5", "sort_type":"1"},
                    sort_macro.push({'range_type': '1', 'value': dtac.between_r1, 'value_two': dtac.between_r2, 'sort_type': dtac.sortMap[dtac.betn_orderby]});
                } else if (elem.id == "2") {
                    // LESS THAN --> {"range_type":"1","value":"1","value_two":"", "sort_type":"0"}
                    sort_macro.push({'range_type': '2', 'value': dtac.lessthan_r1, 'value_two': "", 'sort_type': dtac.sortMap[dtac.lessthan_orderby]});
                } else if (elem.id == "3") {
                    // GREATER THAN --> {"range_type":"2","value":"1","value_two":"", "sort_type":"0"}
                    sort_macro.push({'range_type': '3', 'value': dtac.greaterthan_r1, 'value_two': "", 'sort_type': dtac.sortMap[dtac.greaterthan_orderby]});
                }
            });
            dtac.dispatch('responsedtacdata', sort_macro);
        });
        dtac.sortMap = {'ASC': '1', 'DSC': '2', 'RND': '3'};

        dtac.sortableOptions = {
            update: function(e, ui) {
                console.log('update');
            }
        };
        dtac.sortTypes = ['ASC', 'DSC', 'RND'];
        dtac.betn_orderby = dtac.sortTypes[0];
        dtac.lessthan_orderby = dtac.sortTypes[0];
        dtac.greaterthan_orderby = dtac.sortTypes[0];

        dtac.rangeOptions = [
            {id: '1', type:"Between", inputs:2, value:0},
            {id: '2', type:"Less Than", inputs: 1, value:1},
            {id: '3', type:"Greater Than", inputs: 1, value:2}
        ];

        dtac.addNewRangeType = function() {
            console.log('addNewRangeType: ', dtac.selectedRangeType);
            _(dtac.rangeOptions).forEach(function (elem) {
                if (elem.id == dtac.selectedRangeId) {
                    dtac.rangeTypes.push(elem);
                    dtac.rangeOptions = _.without(dtac.rangeOptions, elem);
                    dtac.selectedRangeType = 'Select Range';
                    dtac.rangeTypeAddDisabled = true;
                    if (elem.id == 1) {
                        dtac.between_r1 = '';
                        dtac.between_r2 = '';
                    } else if (elem.id == 2) {
                        dtac.lessthan_r1 = '';
                    } else if (elem.id == 3) {
                        dtac.greaterthan_r1 = '';
                    }
                }
            });
        };

        dtac.selectNewRangeType = function(rangeType) {
            console.log('selectNewOperation');
            dtac.rangeTypeAddDisabled = false;
            dtac.selectedRangeType = rangeType.type;
            dtac.selectedRangeId = rangeType.id;
        };

        dtac.toggleStatusTypeDropdown = function() {
            dtac.dropdownStatus = !dtac.dropdownStatus;
        };

        dtac.removeSelectedRangeType = function(rangeType) {
            console.log('removeSelectedOperation: ', rangeType);
            _(dtac.rangeTypes).forEach(function (elem) {
                if (elem.id == rangeType.id) {
                    dtac.rangeTypes = _.without(dtac.rangeTypes, rangeType);
                    dtac.rangeOptions.push(rangeType);
                }
            });
        };
    })


;






