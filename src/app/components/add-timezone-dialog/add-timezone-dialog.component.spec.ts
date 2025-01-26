import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTimezoneDialogComponent } from './add-timezone-dialog.component';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AddTimezoneDialogComponent', () => {
  let component: AddTimezoneDialogComponent;
  let fixture: ComponentFixture<AddTimezoneDialogComponent>;
  const matDialogRefMock = {
    close: () => {
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddTimezoneDialogComponent,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatDialogActions,
        MatButton,
        MatDialogTitle,
        MatDialogContent,
        NgForOf
      ], // Declare the component being tested
      providers: [
        {provide: MatDialogRef, useValue: matDialogRefMock},
        provideAnimations()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddTimezoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
