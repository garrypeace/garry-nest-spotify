import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import qs from 'qs';

@Injectable()
export class SpotifyService {
  private tokenExpiry: number;
  private token;

  constructor(private http: HttpService) {}

  async getToken(): Promise<any> {
    console.log('Getting token');
    const client_id = 'b898d66b4d1e4a55ab2881cd2106810c';
    const client_secret = 'cfdf01d7862e4712a754458777e1c881';

    const options = {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: 'grant_type=client_credentials',
      url: 'https://accounts.spotify.com/api/token',
    };
    const response = await axios(options);

    const { access_token } = response.data;

    return access_token;
  }

  getArtistById(id: string) {
    return '';
  }
}
