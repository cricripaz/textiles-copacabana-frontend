import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ColorApiService } from './color-api.service';
import { environment } from '../../environments/environment';

describe('ColorApiService', () => {
  let service: ColorApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ColorApiService]
    });
    service = TestBed.inject(ColorApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch colors', () => {
    const dummyResponse = {
      message: "Colors get successfully",
      colors: [
        { color_id: 1, name: 'ACERO TEST 2', description: '', status: 'active' },
        { color_id: 2, name: 'ACERO CLARO', description: null, status: 'active' },
        { color_id: 3, name: 'ACERO INTERMEDIO', description: null, status: 'active' },
        { color_id: 4, name: 'ACERO OSCURO', description: null, status: 'active' },
        { color_id: 5, name: 'AIRAMPU', description: null, status: 'active' },
        { color_id: 6, name: 'AMARILLO', description: null, status: 'active' },
        // Otros colores...
      ]
    };

    service.getColors().subscribe(response => {
      expect(response.message).toBe("Colors get successfully");
      expect(response.colors.length).toBeGreaterThan(0);
      expect(response.colors[0].color_id).toBe(1);
      expect(response.colors[0].name).toBe('ACERO TEST 2');
      expect(response.colors[0].description).toBe('');
      expect(response.colors[0].status).toBe('active');
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/colors`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });


  it('should create a color and return success message', () => {
    const newColor = { name: 'test PostMan', description: '' };
    const responseMessage = { message: 'Color Create Successfully' };

    service.createColor(newColor).subscribe((response :any)  => {
      expect(response.message).toBe('Color Create Successfully');
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/colors/create`);
    expect(req.request.method).toBe('POST');
    req.flush(responseMessage);
  });


  it('should edit a color and return success message', () => {
    const updatedColor = { name: 'ACERO TEST', description: '' };
    const responseMessage = { message: 'Color Update Successfully' };
    const resultMessage = 'Color Update Succesfully'; // Mensaje esperado que no coincide

    service.editColor(1, updatedColor).subscribe(
      (response: any) => {
        console.log('Expected:', resultMessage);
        console.log('Received:', response.message);
        expect(response.message).toEqual(resultMessage); // Esto debería fallar porque los mensajes no coinciden
      },
      (error) => {
        fail('Expected success response, but got an error');
      }
    );

    const req = httpMock.expectOne(`${environment.baseUrl}/colors/edit/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(responseMessage); // Simula la respuesta del servidor
  });


  it('should delete a color', () => {
    service.deleteColor(1).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/colors/delete/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('fail test ' ,() => {
    expect(2).toEqual(3)
  })

});
