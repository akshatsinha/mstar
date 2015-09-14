'use strict';

angular.module('mstarApp')
    .controller('MappingsCtrl', function (ajaxSvc) {
        var mc = this;
        mc.modalStyle = 'display: none';
        mc.sitewideTab = false;
        mc.countyTab = false;
        mc.cityTab = false;
        mc.ipaddressTab = false;
        mc.stateTab = true;
        mc.selectRuleDropdown = false;
        mc.selectedState = 'SELECT STATE';
        mc.selectedStates = [];
        mc.selectedRule = 'SELECT RULE';
        mc.sortSetRules = [];
        mc.addStateAndRuleButtonDisabled = true;

        function printResult(result){
            console.log(result);
        }

        mc.createMapping = function() {
            console.log('createMapping');
            mc.modalStyle = 'display: block';
            mc.selectMappingTab('state');
        };

        mc.resetAllTabs = function() {
            mc.sitewideTab = false;
            mc.countyTab = false;
            mc.cityTab = false;
            mc.ipaddressTab = false;
            mc.stateTab = false;
        };

        mc.addNewMapping = function() {
            console.log('addNewMapping: ', mc.selectedRuleId, mc.selectedStates);
            var stateAbbrList = [];
            _(mc.selectedStates).forEach(function (elem) {
                stateAbbrList.push(elem.abbr);
            });

            ajaxSvc.callService("SortStateMap", "upsert", encodeURIComponent('{"sort_state_map_sort_set_id_fk":"' + mc.selectedRuleId + '","sort_state_map_sort_container_id_fk":"2","sort_state_map_state": "' + stateAbbrList.join('|') + '"  }'), printResult)
                .then(function (response) {
                    console.log(response);
                });
            window.location.reload();
        };

        mc.toggleSelectRuleDropdown = function() {
            mc.selectRuleDropdown = !mc.selectRuleDropdown;
        };

        mc.selectRuleFromDropdown = function(selectedRule) {
            console.log('selectRuleFromDropdown: ', selectedRule);
            mc.selectedRule = selectedRule.name;
            mc.selectedRuleId = selectedRule.id;
            mc.addStateAndRuleButtonDisabled = false;
        };

        mc.selectMappingTab = function(selectedTab) {
            mc.resetAllTabs();
            if (selectedTab == 'sitewide')  mc.sitewideTab = true;
            else if (selectedTab == 'state') mc.stateTab = true;
            else if (selectedTab == 'county') mc.countyTab = true;
            else if (selectedTab == 'city')  mc.cityTab = true;
            else if (selectedTab == 'ipaddress') mc.ipaddressTab = true;
        };

        mc.resetForm = function() {
            console.log('resetForm');
            mc.modalStyle = 'display: none';
        };

        mc.getSavedMappings = function() {
            console.log('getSavedMappings');
            ajaxSvc.callService("SortStateMap", "get", encodeURIComponent('{"sort_state_map_sort_set_id_fk":"","sort_state_map_id":"","sort_state_map_sort_container_id_fk":"2","sort_state_map_state":"","constraints":"CONT","fxn":""}'), printResult)
                .then(function (response) {
                    console.log(response);
                    mc.savedMappings = response.data.result;
                });



            // Get list of rules
            ajaxSvc.callService("SortSet", "get", encodeURIComponent('{"sort_set_sort_container_id_fk":"2","constraints":"CONT","sort_set_id":"","fxn":""}'), printResult)
                .then(function(response) {
                    var resultsObj = response.data.result;
                    _(resultsObj).forEach(function (elem) {
                        mc.sortSetRules.push({'name': elem.sort_set_name, 'id': elem.sort_set_id});
                    });
                });
        };


        mc.states = [
            {'abbr': 'AL', 'name': 'ALABAMA'},
            {'abbr': 'AK', 'name': 'ALASKA'},
            {'abbr': 'AZ', 'name': 'ARIZONA'},
            {'abbr': 'AR', 'name': 'ARKANSAS'},
            {'abbr': 'CA', 'name': 'CALIFORNIA'},
            {'abbr': 'CO', 'name': 'COLORADO'},
            {'abbr': 'CT', 'name': 'CONNECTICUT'},
            {'abbr': 'DE', 'name': 'DELAWARE'},
            {'abbr': 'FL', 'name': 'FLORIDA'},
            {'abbr': 'GA', 'name': 'GEORGIA'},
            {'abbr': 'HI', 'name': 'HAWAII'},
            {'abbr': 'ID', 'name': 'IDAHO'},
            {'abbr': 'IL', 'name': 'ILLINOIS'},
            {'abbr': 'IN', 'name': 'INDIANA'},
            {'abbr': 'IA', 'name': 'IOWA'},
            {'abbr': 'KS', 'name': 'KANSAS'},
            {'abbr': 'KY', 'name': 'KENTUCKY'},
            {'abbr': 'LA', 'name': 'LOUISIANA'},
            {'abbr': 'ME', 'name': 'MAINE'},
            {'abbr': 'MD', 'name': 'MARYLAND'},
            {'abbr': 'MA', 'name': 'MASSACHUSETTS'},
            {'abbr': 'MI', 'name': 'MICHIGAN'},
            {'abbr': 'MN', 'name': 'MINNESOTA'},
            {'abbr': 'MS', 'name': 'MISSISSIPPI'},
            {'abbr': 'MO', 'name': 'MISSOURI'},
            {'abbr': 'MT', 'name': 'MONTANA'},
            {'abbr': 'NE', 'name': 'NEBRASKA'},
            {'abbr': 'NV', 'name': 'NEVADA'},
            {'abbr': 'NH', 'name': 'NEW HAMPSHIRE'},
            {'abbr': 'NJ', 'name': 'NEW JERSEY'},
            {'abbr': 'NM', 'name': 'NEW MEXICO'},
            {'abbr': 'NY', 'name': 'NEW YORK'},
            {'abbr': 'NC', 'name': 'NORTH CAROLINA'},
            {'abbr': 'ND', 'name': 'NORTH DAKOTA'},
            {'abbr': 'OH', 'name': 'OHIO'},
            {'abbr': 'OK', 'name': 'OKLAHOMA'},
            {'abbr': 'OR', 'name': 'OREGON'},
            {'abbr': 'PA', 'name': 'PENNSYLVANIA'},
            {'abbr': 'RI', 'name': 'RHODE ISLAND'},
            {'abbr': 'SC', 'name': 'SOUTH CAROLINA'},
            {'abbr': 'SD', 'name': 'SOUTH DAKOTA'},
            {'abbr': 'TN', 'name': 'TENNESSEE'},
            {'abbr': 'TX', 'name': 'TEXAS'},
            {'abbr': 'UT', 'name': 'UTAH'},
            {'abbr': 'VT', 'name': 'VERMONT'},
            {'abbr': 'VA', 'name': 'VIRGINIA'},
            {'abbr': 'WA', 'name': 'WASHINGTON'},
            {'abbr': 'WV', 'name': 'WEST VIRGINIA'},
            {'abbr': 'WI', 'name': 'WISCONSIN'},
            {'abbr': 'WY', 'name': 'WYOMING'}
        ];

    });
