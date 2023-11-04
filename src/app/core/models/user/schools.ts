export class SchoolsData {
    id?: number;
    school_name?:  string ;
    y?: number
    x?: number;
    type_of_school?:  string ;
     study_period?:  string;
     educational_level?:  string ;
     number_of_classes?: [number, number];
     computer_lab?: 1;
     science_lab?: 1;
     physics_lab?: 0;
     chemistry_lab?: 0;
     biology_lab?: 0;
     administrative_rooms?: 8;
     stage?: string;
     mosque?: string;
     ambulance_room?: string;
     specialist_room?: string;
     library?: string;
     canteen?: string;
     guard_room?: string;
     playgrounds?: string;
     bathrooms?: number;
     academic_level?: string;
     number_of_libyan_males?: number;
     number_of_libyan_females?: number;
     number_of_foreign_males?: number;
     number_of_foreign_females?: number;
     number_of_males_special_categories?: number;
     number_of_females_in_special_categories?: number;
     total?: number;
     academic_levels?: EducationalLevel[];
  }

  export interface EducationalLevel {
    academic_level:                          string;
    number_of_libyan_males:                  number;
    number_of_libyan_females:                number;
    number_of_foreign_males:                 number;
    number_of_foreign_females:               number;
    number_of_males_special_categories:      number;
    number_of_females_in_special_categories: number;
    total:                                   number;
}