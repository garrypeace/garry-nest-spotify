import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpotifyService {
  private tokenExpiry: number;
  private accessToken;

  async getAccessToken(): Promise<any> {
    if (this.hasValidToken) {
      console.log('Returning cached access token...');
      return this.accessToken;
    }

    const clientId = 'b898d66b4d1e4a55ab2881cd2106810c';
    const clientSecret = 'cfdf01d7862e4712a754458777e1c881';

    const options = {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(clientId + ':' + clientSecret).toString('base64'),
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: 'grant_type=client_credentials',
      url: 'https://accounts.spotify.com/api/token',
    };
    const response = await axios(options);

    this.setToken(response.data.access_token, response.data.expires_in);

    console.log('Returning new access token...');
    return this.accessToken;
  }

  setToken(token: string, expires_in: number): void {
    console.log('Setting access token...');
    this.accessToken = token;
    this.tokenExpiry = Date.now() + expires_in * 1000;
  }

  get hasValidToken(): boolean {
    const hasExpired = Date.now() > this.tokenExpiry;

    if (hasExpired) {
      console.log(
        `Token is now ${
          (Date.now() - this.tokenExpiry) / 1000 / 60
        } minutes out of date.`,
      );
    }

    return this.accessToken && !hasExpired;
  }

  async makeCall(url: string) {
    const accessToken = await this.getAccessToken();

    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'content-type': 'application/json',
      },
      url: url,
    };

    console.log(
      `Making API call to Spotify... (token is valid until ${new Date(
        this.tokenExpiry,
      )})`,
    );
    return await axios(options);
  }

  getArtistById(id: string) {
    const url = `https://api.spotify.com/v1/artists/${id}`;
    return this.makeCall(url);
  }
}
