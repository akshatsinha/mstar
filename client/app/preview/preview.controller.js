'use strict';

angular.module('mstarApp')
    .controller('PreviewCtrl', function (ajaxSvc, $sce) {
        var pc = this;
        pc.searchedText = '';

        function printResult(result){
            console.log(result);
        }

        pc.performSearch = function() {
            if (pc.searchedText == '') pc.searchedText = 'CA';
            ajaxSvc.callService("SortSearch", "get", encodeURIComponent('{"auction_type":"r","state":"' + pc.searchedText + '","sort_container_id":"2","limit":"20"}'), printResult)
                .then(function (response) {
                    console.log(response);
                    pc.listings = response.data.result.listings;
                });
        };

    });
