import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

const googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
const githubLogoURL = 'https://raw.githubusercontent.com/gilbarbara/logos/c122ccfcfdb15d9958a85696ff2460ac3b01f8ca/logos/github-icon.svg';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss']
})
export class SocialsComponent implements OnInit {
  domain = environment.domain;

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.matIconRegistry.addSvgIcon('githubLogo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(githubLogoURL));
  }

  ngOnInit(): void {
  }

}
