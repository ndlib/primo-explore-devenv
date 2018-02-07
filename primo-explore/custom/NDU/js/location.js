(function(){
    'use strict';

    let app = angular.module('customLocation', ['angularLoad']);

    registerModule('customLocation')

    app.controller('AvailabilityAfterController', ['angularLoad', function (angularLoad) {
        let vm = this

        vm.isOutboundLink = false
        let delivery = this.parentCtrl.result.delivery

        // if we have holdings, display holdings
        if (delivery.holding.length > 0) {
            let holdings = delivery.holding
            for (let i in holdings) {
                holdings[i].libraryCode = this.parentCtrl.$translate.instant(holdings[i].libraryCode)
                // for some reason &nbsp; wasn't being translated to a space by the browser, so do it manually
                holdings[i].subLocation = holdings[i].subLocation.replace('&nbsp;', ' ')
            }

            // set the array to iterate through in the template
            vm.locations = holdings
            vm.useLinkIcon = false
        } else {
            let code = 'Online access may be available'

            // this is set if there are no links (other than findtext) or holdings
            if (delivery.availability[0] === 'no_fulltext') {
                code = 'Online Access Not Found'

                // we want to link to ILL directly on the list page
                let link = delivery.availabilityLinksUrl[0]

                // if we don't have a link, just findtext, replace it with ill
                if (link.includes('findtext.library.nd.edu')) {
                    let start = link.indexOf('?')
                    const ill = 'https://login.proxy.library.nd.edu/login?url=https://nd.illiad.oclc.org/illiad/IND/illiad.dll/OpenURL'
                    vm.isOutboundLink = ill + link.substr(start)
                    code = 'Access via ILL'
                }
            }
            // set the list to iterate through in the template, will just be the text from above
            vm.locations = [ { libraryCode: code } ]
            vm.useLinkIcon = true
        }

        // either open the fullview panel, or link to ILL directly
        vm.onLinkClick = function() {
            if (vm.isOutboundLink) {
                window.open(vm.isOutboundLink)
                return
            }

            let eventData = {
                index: 'getit_link1_0',
                target: this.parentCtrl.$element[0]
            };
            this.parentCtrl.openFullDisplayWithGetit1.emit(eventData);
        }
    }])

    // This is mostly copied from what they were doing, but with some changes to display what we want
    app.component('prmSearchResultAvailabilityLineAfter', {
        bindings: {parentCtrl: '<'},
        controller: 'AvailabilityAfterController',
        template: `
<div ng-repeat="availability in $ctrl.locations track by $index" layout="row" layout-align="start start" class="layout-align-start-start layout-row">
  <prm-icon ng-if="$ctrl.useLinkIcon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="link" availability-type>
    <md-icon md-svg-icon="primo-ui:link" aria-label="icon-link" class="md-primoExplore-theme" aria-hidden="true" />
  </prm-icon>
  <prm-icon ng-if="!$ctrl.useLinkIcon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="book-open" availability-type>
    <md-icon md-svg-icon="primo-ui:book-open" aria-label="icon-book-open" class="md-primoExplore-theme" aria-hidden="true" />
  </prm-icon>
  <button class="neutralized-button arrow-link-button md-button md-primoExplore-theme md-ink-ripple" type="button" prm-brief-internal-button-marker="" ng-click="$ctrl.onLinkClick();$event.preventDefault();">
    <span class="button-content">
      <span class="availability-status">
        <span class="best-location-library-code locations-link">{{availability.libraryCode}}</span>
        <span class="best-location-sub-location locations-link">{{availability.subLocation}}</span>
        <span class="best-location-delivery locations-link">{{availability.callNumber}}</span>
      </span>
      <prm-icon ng-if="$ctrl.isOutboundLink" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new" aria-label="externalLink" class="ng-scope ng-isolate-scope" external-link>
        <md-icon md-svg-icon="primo-ui:open-in-new" aria-label="externalLink" class="md-primoExplore-theme" aria-hidden="true" />
      </prm-icon>
    </span>
    <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right">
      <md-icon md-svg-icon="primo-ui:chevron-right" aria-label="icon-chevron-right" class="md-primoExplore-theme" role="img" aria-hidden="true" />
      <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
    </prm-icon>
    <div class="md-ripple-container" style=""></div>
  </button>
</div>
`
    })

})();