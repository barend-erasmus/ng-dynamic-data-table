import { Component } from '@angular/core';
import { DynamicDataTableModel } from './models/dynamic-data-table-model';
import { Observable } from 'rxjs/Observable';
import { ColumnModel } from './models/column-model';
import { SortModel } from './models/sort-model';
import { FilterModel } from './models/filter-model';
import { CheckboxValueModel } from './models/checkbox-value-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  public loadModelFromMock(model: DynamicDataTableModel): Observable<DynamicDataTableModel> {
    return new Observable((observer) => {

      if (!model) {
        model = new DynamicDataTableModel(
          [
            new ColumnModel('first_name', null, 'First Name', new SortModel(null), 'text'),
            new ColumnModel('last_name', null, 'Last Name', new SortModel(null), 'text'),
            new ColumnModel('email', new FilterModel(false, null, 'text', null, null), 'Email Address', null, 'text'),
            new ColumnModel('gender', new FilterModel(false, null, 'checkbox', null, [
              new CheckboxValueModel('Male', true, 'Male'),
              new CheckboxValueModel('Female', true, 'Female'),
            ]), 'Gender', null, 'text'),
            new ColumnModel('ip_address', null, 'IP Address', null, 'text'),
            new ColumnModel('clicks', new FilterModel(false, null, 'numeric', null, null), 'Number of Clicks', null, 'numeric'),
          ],
          AppComponent.data.length,
          [],
          null,
          0,
          15,
        );
      }

      let tempData = AppComponent.data;

      for (const column of model.columns) {
        if (column.filter && column.filter.type === 'checkbox') {
          tempData = tempData.filter((x) => {
            for (const checkboxValue of column.filter.checkboxValues) {
              if (checkboxValue.selected && checkboxValue.value === x[column.accessor]) {
                return true;
              }
            }

            return false;
          });
        } else if (column.filter && column.filter.type === 'text' && column.filter.value != undefined && column.filter.value != null) {
          tempData = tempData.filter((x) => x[column.accessor].indexOf(column.filter.value) > -1);
        } else if (column.filter && column.filter.type === 'numeric' && column.filter.value != undefined && column.filter.value != null) {
          if (column.filter.operator === 'equal') {
            tempData = tempData.filter((x) => x[column.accessor] === column.filter.value);
          } else if (column.filter.operator === 'not-equal') {
            tempData = tempData.filter((x) => x[column.accessor] !== column.filter.value);
          } else if (column.filter.operator === 'greater') {
            tempData = tempData.filter((x) => x[column.accessor] > column.filter.value);
          } else if (column.filter.operator === 'greater-equal') {
            tempData = tempData.filter((x) => x[column.accessor] >= column.filter.value);
          } else if (column.filter.operator === 'less') {
            tempData = tempData.filter((x) => x[column.accessor] < column.filter.value);
          } else if (column.filter.operator === 'less-equal') {
            tempData = tempData.filter((x) => x[column.accessor] <= column.filter.value);
          }
        }
      }

      for (const column of model.columns) {
        if (column.sort && column.sort.direction) {
          tempData = tempData.sort((a, b) => {
            if (typeof (a[column.accessor]) === 'string' && typeof (b[column.accessor]) === 'string') {
              return column.sort.direction === 'ASC' ? (a[column.accessor].localeCompare(b[column.accessor])) : (b[column.accessor].localeCompare(a[column.accessor]));
            } else {
              return column.sort.direction === 'ASC' ? (a[column.accessor] - b[column.accessor]) : (b[column.accessor] - a[column.accessor]);
            }
          });
        }
      }

      model.data = tempData.slice(model.skip, model.skip + model.take);
      model.count = tempData.length;

      observer.next(model);
      observer.complete();
    });;
  }

  public static data: any[] = [{ "id": 1, "first_name": "Billie", "last_name": "Midner", "email": "bmidner0@webmd.com", "gender": "Male", "ip_address": "68.188.162.198", "clicks": 68 },
  { "id": 2, "first_name": "Dalli", "last_name": "China", "email": "dchina1@ftc.gov", "gender": "Male", "ip_address": "222.241.35.141", "clicks": 47 },
  { "id": 3, "first_name": "Jed", "last_name": "Hindrich", "email": "jhindrich2@phoca.cz", "gender": "Male", "ip_address": "68.44.92.243", "clicks": 76 },
  { "id": 4, "first_name": "Luther", "last_name": "Lantuff", "email": "llantuff3@hp.com", "gender": "Male", "ip_address": "130.107.105.138", "clicks": 25 },
  { "id": 5, "first_name": "Cassaundra", "last_name": "Nast", "email": "cnast4@photobucket.com", "gender": "Female", "ip_address": "148.239.146.232", "clicks": 81 },
  { "id": 6, "first_name": "Eolande", "last_name": "De Freyne", "email": "edefreyne5@mtv.com", "gender": "Female", "ip_address": "73.63.214.69", "clicks": 91 },
  { "id": 7, "first_name": "Erasmus", "last_name": "Doonican", "email": "edoonican6@unc.edu", "gender": "Male", "ip_address": "112.217.111.231", "clicks": 86 },
  { "id": 8, "first_name": "Lissi", "last_name": "Dinnage", "email": "ldinnage7@dedecms.com", "gender": "Female", "ip_address": "59.187.174.126", "clicks": 24 },
  { "id": 9, "first_name": "Deeyn", "last_name": "Kybbye", "email": "dkybbye8@4shared.com", "gender": "Female", "ip_address": "70.97.188.40", "clicks": 34 },
  { "id": 10, "first_name": "Winfred", "last_name": "Freckelton", "email": "wfreckelton9@netlog.com", "gender": "Male", "ip_address": "5.83.29.13", "clicks": 84 },
  { "id": 11, "first_name": "Andrus", "last_name": "Oxtarby", "email": "aoxtarbya@stumbleupon.com", "gender": "Male", "ip_address": "71.100.236.174", "clicks": 9 },
  { "id": 12, "first_name": "Katinka", "last_name": "Olivie", "email": "kolivieb@cdc.gov", "gender": "Female", "ip_address": "174.135.102.174", "clicks": 37 },
  { "id": 13, "first_name": "Rip", "last_name": "Bubbins", "email": "rbubbinsc@vimeo.com", "gender": "Male", "ip_address": "212.242.88.82", "clicks": 76 },
  { "id": 14, "first_name": "Mylo", "last_name": "Castilljo", "email": "mcastilljod@spiegel.de", "gender": "Male", "ip_address": "244.218.21.13", "clicks": 45 },
  { "id": 15, "first_name": "Tonnie", "last_name": "Gerling", "email": "tgerlinge@slate.com", "gender": "Male", "ip_address": "192.141.201.151", "clicks": 45 },
  { "id": 16, "first_name": "Heddi", "last_name": "Caughte", "email": "hcaughtef@house.gov", "gender": "Female", "ip_address": "58.59.123.0", "clicks": 70 },
  { "id": 17, "first_name": "Trueman", "last_name": "Aggio", "email": "taggiog@yahoo.co.jp", "gender": "Male", "ip_address": "20.226.168.14", "clicks": 9 },
  { "id": 18, "first_name": "Darline", "last_name": "MacLeod", "email": "dmacleodh@amazonaws.com", "gender": "Female", "ip_address": "235.106.58.159", "clicks": 69 },
  { "id": 19, "first_name": "Adel", "last_name": "Perkins", "email": "aperkinsi@imageshack.us", "gender": "Female", "ip_address": "238.177.236.125", "clicks": 44 },
  { "id": 20, "first_name": "Maureene", "last_name": "Merman", "email": "mmermanj@salon.com", "gender": "Female", "ip_address": "9.47.223.113", "clicks": 10 },
  { "id": 21, "first_name": "Amalle", "last_name": "Ornelas", "email": "aornelask@yellowbook.com", "gender": "Female", "ip_address": "218.94.112.16", "clicks": 89 },
  { "id": 22, "first_name": "Matthieu", "last_name": "Fass", "email": "mfassl@nba.com", "gender": "Male", "ip_address": "219.27.116.126", "clicks": 53 },
  { "id": 23, "first_name": "Skipper", "last_name": "Sleney", "email": "ssleneym@odnoklassniki.ru", "gender": "Male", "ip_address": "74.230.24.163", "clicks": 74 },
  { "id": 24, "first_name": "Dell", "last_name": "Scotts", "email": "dscottsn@dmoz.org", "gender": "Male", "ip_address": "33.59.148.67", "clicks": 5 },
  { "id": 25, "first_name": "Zabrina", "last_name": "Silverlock", "email": "zsilverlocko@kickstarter.com", "gender": "Female", "ip_address": "209.126.99.80", "clicks": 86 },
  { "id": 26, "first_name": "Giles", "last_name": "Fearnside", "email": "gfearnsidep@narod.ru", "gender": "Male", "ip_address": "27.116.232.130", "clicks": 13 },
  { "id": 27, "first_name": "Felecia", "last_name": "Howes", "email": "fhowesq@techcrunch.com", "gender": "Female", "ip_address": "226.161.83.97", "clicks": 85 },
  { "id": 28, "first_name": "Warner", "last_name": "Paty", "email": "wpatyr@histats.com", "gender": "Male", "ip_address": "173.16.127.218", "clicks": 95 },
  { "id": 29, "first_name": "Dolorita", "last_name": "Franey", "email": "dfraneys@blinklist.com", "gender": "Female", "ip_address": "255.26.215.222", "clicks": 91 },
  { "id": 30, "first_name": "Curtice", "last_name": "Kattenhorn", "email": "ckattenhornt@wp.com", "gender": "Male", "ip_address": "84.24.6.24", "clicks": 62 },
  { "id": 31, "first_name": "Kendall", "last_name": "Castagnier", "email": "kcastagnieru@gravatar.com", "gender": "Male", "ip_address": "89.143.35.231", "clicks": 48 },
  { "id": 32, "first_name": "Blane", "last_name": "Thayre", "email": "bthayrev@senate.gov", "gender": "Male", "ip_address": "17.185.145.75", "clicks": 30 },
  { "id": 33, "first_name": "Mateo", "last_name": "Kindley", "email": "mkindleyw@prnewswire.com", "gender": "Male", "ip_address": "162.208.230.49", "clicks": 80 },
  { "id": 34, "first_name": "Bari", "last_name": "O'Daly", "email": "bodalyx@chronoengine.com", "gender": "Female", "ip_address": "2.227.124.108", "clicks": 49 },
  { "id": 35, "first_name": "Mord", "last_name": "Rubinow", "email": "mrubinowy@cnet.com", "gender": "Male", "ip_address": "116.118.248.139", "clicks": 21 },
  { "id": 36, "first_name": "Dermot", "last_name": "Pettie", "email": "dpettiez@google.com.br", "gender": "Male", "ip_address": "156.80.242.31", "clicks": 9 },
  { "id": 37, "first_name": "Marsha", "last_name": "Morl", "email": "mmorl10@ebay.com", "gender": "Female", "ip_address": "214.62.183.190", "clicks": 1 },
  { "id": 38, "first_name": "Demetre", "last_name": "Ilyasov", "email": "dilyasov11@cdc.gov", "gender": "Male", "ip_address": "4.9.228.131", "clicks": 42 },
  { "id": 39, "first_name": "Pattie", "last_name": "Meadmore", "email": "pmeadmore12@netscape.com", "gender": "Male", "ip_address": "27.5.111.217", "clicks": 83 },
  { "id": 40, "first_name": "Chilton", "last_name": "Blune", "email": "cblune13@slideshare.net", "gender": "Male", "ip_address": "0.108.204.153", "clicks": 18 },
  { "id": 41, "first_name": "Evangelin", "last_name": "Brandenburg", "email": "ebrandenburg14@paypal.com", "gender": "Female", "ip_address": "110.201.150.155", "clicks": 43 },
  { "id": 42, "first_name": "Hersch", "last_name": "Phifer", "email": "hphifer15@irs.gov", "gender": "Male", "ip_address": "98.74.157.158", "clicks": 60 },
  { "id": 43, "first_name": "Lavina", "last_name": "Dearman", "email": "ldearman16@usda.gov", "gender": "Female", "ip_address": "42.154.87.205", "clicks": 46 },
  { "id": 44, "first_name": "Wilburt", "last_name": "Shurmer", "email": "wshurmer17@wikipedia.org", "gender": "Male", "ip_address": "98.168.206.174", "clicks": 30 },
  { "id": 45, "first_name": "Ramsay", "last_name": "Pidgeley", "email": "rpidgeley18@about.me", "gender": "Male", "ip_address": "210.231.61.102", "clicks": 44 },
  { "id": 46, "first_name": "Crichton", "last_name": "Frift", "email": "cfrift19@google.cn", "gender": "Male", "ip_address": "90.212.126.122", "clicks": 9 },
  { "id": 47, "first_name": "Lynnett", "last_name": "Raveau", "email": "lraveau1a@digg.com", "gender": "Female", "ip_address": "137.223.130.39", "clicks": 57 },
  { "id": 48, "first_name": "Aldrich", "last_name": "Slopier", "email": "aslopier1b@ed.gov", "gender": "Male", "ip_address": "75.242.158.24", "clicks": 79 },
  { "id": 49, "first_name": "Lucina", "last_name": "Thornally", "email": "lthornally1c@telegraph.co.uk", "gender": "Female", "ip_address": "87.103.156.216", "clicks": 99 },
  { "id": 50, "first_name": "Micheal", "last_name": "Farrey", "email": "mfarrey1d@blog.com", "gender": "Male", "ip_address": "12.135.165.6", "clicks": 90 },
  { "id": 51, "first_name": "Ruthanne", "last_name": "Rowswell", "email": "rrowswell1e@huffingtonpost.com", "gender": "Female", "ip_address": "55.87.65.221", "clicks": 61 },
  { "id": 52, "first_name": "Flor", "last_name": "Woolforde", "email": "fwoolforde1f@ycombinator.com", "gender": "Female", "ip_address": "101.224.49.134", "clicks": 5 },
  { "id": 53, "first_name": "Freda", "last_name": "Keppel", "email": "fkeppel1g@nytimes.com", "gender": "Female", "ip_address": "11.97.76.159", "clicks": 40 },
  { "id": 54, "first_name": "Joachim", "last_name": "Goodier", "email": "jgoodier1h@psu.edu", "gender": "Male", "ip_address": "148.105.33.26", "clicks": 66 },
  { "id": 55, "first_name": "Justino", "last_name": "Goodship", "email": "jgoodship1i@time.com", "gender": "Male", "ip_address": "22.93.172.240", "clicks": 17 },
  { "id": 56, "first_name": "Leena", "last_name": "Helwig", "email": "lhelwig1j@macromedia.com", "gender": "Female", "ip_address": "89.234.255.7", "clicks": 66 },
  { "id": 57, "first_name": "Ryan", "last_name": "Focke", "email": "rfocke1k@cloudflare.com", "gender": "Male", "ip_address": "126.230.130.47", "clicks": 91 },
  { "id": 58, "first_name": "Vasily", "last_name": "Radage", "email": "vradage1l@blinklist.com", "gender": "Male", "ip_address": "145.68.190.39", "clicks": 15 },
  { "id": 59, "first_name": "George", "last_name": "Pettitt", "email": "gpettitt1m@360.cn", "gender": "Male", "ip_address": "122.106.110.58", "clicks": 100 },
  { "id": 60, "first_name": "Lowell", "last_name": "Collier", "email": "lcollier1n@ehow.com", "gender": "Male", "ip_address": "193.143.105.164", "clicks": 23 },
  { "id": 61, "first_name": "Onida", "last_name": "Judkins", "email": "ojudkins1o@va.gov", "gender": "Female", "ip_address": "222.55.244.71", "clicks": 38 },
  { "id": 62, "first_name": "Rafael", "last_name": "Brunet", "email": "rbrunet1p@mayoclinic.com", "gender": "Male", "ip_address": "26.81.83.113", "clicks": 10 },
  { "id": 63, "first_name": "Bette", "last_name": "Buist", "email": "bbuist1q@netvibes.com", "gender": "Female", "ip_address": "197.191.82.151", "clicks": 43 },
  { "id": 64, "first_name": "Den", "last_name": "Copello", "email": "dcopello1r@harvard.edu", "gender": "Male", "ip_address": "122.139.87.204", "clicks": 1 },
  { "id": 65, "first_name": "Inigo", "last_name": "Bamsey", "email": "ibamsey1s@slashdot.org", "gender": "Male", "ip_address": "105.202.8.165", "clicks": 30 },
  { "id": 66, "first_name": "Alic", "last_name": "Hearl", "email": "ahearl1t@squidoo.com", "gender": "Male", "ip_address": "42.149.36.181", "clicks": 88 },
  { "id": 67, "first_name": "Glenden", "last_name": "Hauch", "email": "ghauch1u@twitpic.com", "gender": "Male", "ip_address": "63.87.23.129", "clicks": 62 },
  { "id": 68, "first_name": "Sheridan", "last_name": "Acutt", "email": "sacutt1v@noaa.gov", "gender": "Male", "ip_address": "57.7.225.147", "clicks": 60 },
  { "id": 69, "first_name": "Stanley", "last_name": "Skellen", "email": "sskellen1w@facebook.com", "gender": "Male", "ip_address": "48.243.168.146", "clicks": 25 },
  { "id": 70, "first_name": "Dallas", "last_name": "Binstead", "email": "dbinstead1x@wisc.edu", "gender": "Female", "ip_address": "168.158.3.211", "clicks": 49 },
  { "id": 71, "first_name": "Alistair", "last_name": "Kestian", "email": "akestian1y@sohu.com", "gender": "Male", "ip_address": "30.1.208.210", "clicks": 51 },
  { "id": 72, "first_name": "Maxim", "last_name": "Meysham", "email": "mmeysham1z@msn.com", "gender": "Male", "ip_address": "245.237.31.191", "clicks": 64 },
  { "id": 73, "first_name": "Petunia", "last_name": "Wantling", "email": "pwantling20@gmpg.org", "gender": "Female", "ip_address": "119.243.116.253", "clicks": 42 },
  { "id": 74, "first_name": "Reagen", "last_name": "Hylden", "email": "rhylden21@shutterfly.com", "gender": "Male", "ip_address": "50.131.88.146", "clicks": 43 },
  { "id": 75, "first_name": "Clerissa", "last_name": "Inston", "email": "cinston22@edublogs.org", "gender": "Female", "ip_address": "46.52.187.193", "clicks": 20 },
  { "id": 76, "first_name": "Maggi", "last_name": "Schiell", "email": "mschiell23@edublogs.org", "gender": "Female", "ip_address": "21.239.50.166", "clicks": 60 },
  { "id": 77, "first_name": "Jammie", "last_name": "Djokovic", "email": "jdjokovic24@scribd.com", "gender": "Female", "ip_address": "123.159.225.180", "clicks": 33 },
  { "id": 78, "first_name": "Rafaelita", "last_name": "Buntain", "email": "rbuntain25@amazon.com", "gender": "Female", "ip_address": "159.51.93.67", "clicks": 2 },
  { "id": 79, "first_name": "Hughie", "last_name": "Coyish", "email": "hcoyish26@mapquest.com", "gender": "Male", "ip_address": "248.26.50.167", "clicks": 23 },
  { "id": 80, "first_name": "Madelle", "last_name": "Janisson", "email": "mjanisson27@e-recht24.de", "gender": "Female", "ip_address": "90.100.154.83", "clicks": 11 },
  { "id": 81, "first_name": "Rufus", "last_name": "Danovich", "email": "rdanovich28@list-manage.com", "gender": "Male", "ip_address": "30.158.100.141", "clicks": 96 },
  { "id": 82, "first_name": "Rudolph", "last_name": "Sidworth", "email": "rsidworth29@ycombinator.com", "gender": "Male", "ip_address": "123.42.88.40", "clicks": 49 },
  { "id": 83, "first_name": "Essa", "last_name": "Michin", "email": "emichin2a@clickbank.net", "gender": "Female", "ip_address": "142.177.29.82", "clicks": 5 },
  { "id": 84, "first_name": "Rafa", "last_name": "Ruffles", "email": "rruffles2b@4shared.com", "gender": "Female", "ip_address": "51.206.199.207", "clicks": 78 },
  { "id": 85, "first_name": "Renaldo", "last_name": "Stennet", "email": "rstennet2c@nsw.gov.au", "gender": "Male", "ip_address": "48.198.229.242", "clicks": 89 },
  { "id": 86, "first_name": "Brooks", "last_name": "Feeny", "email": "bfeeny2d@weebly.com", "gender": "Male", "ip_address": "239.80.235.178", "clicks": 16 },
  { "id": 87, "first_name": "Daniella", "last_name": "Camden", "email": "dcamden2e@umn.edu", "gender": "Female", "ip_address": "2.124.169.163", "clicks": 26 },
  { "id": 88, "first_name": "Christi", "last_name": "Jouaneton", "email": "cjouaneton2f@cbsnews.com", "gender": "Female", "ip_address": "205.56.73.187", "clicks": 20 },
  { "id": 89, "first_name": "Louise", "last_name": "Shropshire", "email": "lshropshire2g@cbslocal.com", "gender": "Female", "ip_address": "7.44.36.194", "clicks": 51 },
  { "id": 90, "first_name": "Nathan", "last_name": "Eddisford", "email": "neddisford2h@unicef.org", "gender": "Male", "ip_address": "158.60.235.203", "clicks": 41 },
  { "id": 91, "first_name": "Danica", "last_name": "Leveret", "email": "dleveret2i@yellowbook.com", "gender": "Female", "ip_address": "135.104.129.241", "clicks": 21 },
  { "id": 92, "first_name": "Adriana", "last_name": "Lindman", "email": "alindman2j@java.com", "gender": "Female", "ip_address": "179.254.207.86", "clicks": 7 },
  { "id": 93, "first_name": "Emelia", "last_name": "Gillingwater", "email": "egillingwater2k@phpbb.com", "gender": "Female", "ip_address": "249.31.214.22", "clicks": 17 },
  { "id": 94, "first_name": "Averell", "last_name": "Varden", "email": "avarden2l@google.co.jp", "gender": "Male", "ip_address": "71.26.228.116", "clicks": 78 },
  { "id": 95, "first_name": "Kelbee", "last_name": "Bunnell", "email": "kbunnell2m@businessinsider.com", "gender": "Male", "ip_address": "136.150.86.85", "clicks": 66 },
  { "id": 96, "first_name": "Ferrell", "last_name": "MacCaig", "email": "fmaccaig2n@bing.com", "gender": "Male", "ip_address": "58.242.187.209", "clicks": 97 },
  { "id": 97, "first_name": "Geoffry", "last_name": "Fatscher", "email": "gfatscher2o@nsw.gov.au", "gender": "Male", "ip_address": "22.155.60.62", "clicks": 23 },
  { "id": 98, "first_name": "Twyla", "last_name": "Chomiszewski", "email": "tchomiszewski2p@businesswire.com", "gender": "Female", "ip_address": "28.52.249.104", "clicks": 54 },
  { "id": 99, "first_name": "James", "last_name": "Milmo", "email": "jmilmo2q@squidoo.com", "gender": "Male", "ip_address": "206.131.178.107", "clicks": 55 },
  { "id": 100, "first_name": "Pepito", "last_name": "Whiffin", "email": "pwhiffin2r@bizjournals.com", "gender": "Male", "ip_address": "143.205.248.150", "clicks": 25 }];
}
