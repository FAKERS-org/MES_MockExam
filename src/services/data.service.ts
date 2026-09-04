import { institutions, type Institution } from "@/data/institutions";
import {
  subjectsByInstitution,
  type ExamGroup,
  type ExamSubject,
} from "@/data/subjects";

export interface SubjectFilterOptions {
  institutionId?: string;
  subjectId?: string;
  groupKey?: string;
  query?: string;
}

export interface SubjectQueryResult {
  institution: Institution | null;
  groups: ExamGroup[];
}

export interface SubjectDetailResult {
  subject: ExamSubject | null;
  group: ExamGroup | null;
}

export interface StatisticsResult {
  totalInstitutions: number;
  totalSubjects: number;
  institutionsWithSubjects: number;
}

class DataService {
  // Institution methods
  getAllInstitutions(): Institution[] {
    return institutions;
  }

  getInstitutionById(id: string): Institution | null {
    return institutions.find((inst) => inst.id === id) ?? null;
  }

  getInstitutionLabels(): Record<string, string> {
    return institutions.reduce<Record<string, string>>((acc, inst) => {
      acc[inst.id] = inst.nameKey;
      return acc;
    }, {});
  }

  // Subject methods
  getSubjectsByInstitution(institutionId: string): SubjectQueryResult {
    const institution = this.getInstitutionById(institutionId);
    const institutionData = subjectsByInstitution[institutionId];

    if (!institutionData) {
      return { institution: null, groups: [] };
    }

    const groups = institutionData.groups.map((group) => ({
      ...group,
      subjects: group.subjects ?? [],
    }));

    return { institution, groups };
  }

  findSubject(institutionId: string, subjectId: string): SubjectDetailResult {
    const institutionData = subjectsByInstitution[institutionId];

    if (!institutionData) {
      return { subject: null, group: null };
    }

    for (const group of institutionData.groups) {
      const subject = group.subjects.find((s) => s.id === subjectId);
      if (subject) {
        return { subject, group };
      }
    }

    return { subject: null, group: null };
  }

  getAllSubjects(): ExamSubject[] {
    return Object.values(subjectsByInstitution).flatMap((data) =>
      data.groups.flatMap((group) => group.subjects ?? [])
    );
  }

  getSubjectCount(institutionId: string): number {
    const institutionData = subjectsByInstitution[institutionId];
    if (!institutionData) return 0;

    return institutionData.groups.reduce(
      (sum, group) => sum + (group.subjects?.length ?? 0),
      0
    );
  }

  // Statistics methods
  getStatistics(): StatisticsResult {
    const totalInstitutions = institutions.length;
    const totalSubjects = this.getAllSubjects().length;
    const institutionsWithSubjects = Object.keys(subjectsByInstitution).length;

    return { totalInstitutions, totalSubjects, institutionsWithSubjects };
  }

  // Search and filter methods
  searchSubjects(filterOptions: SubjectFilterOptions): ExamSubject[] {
    let subjects = this.getAllSubjects();

    if (filterOptions.institutionId) {
      const institutionData = subjectsByInstitution[filterOptions.institutionId];
      if (institutionData) {
        subjects = institutionData.groups.flatMap(
          (group) => group.subjects ?? []
        );
      } else {
        return [];
      }
    }

    if (filterOptions.query) {
      const normalizedQuery = filterOptions.query.toLowerCase();
      subjects = subjects.filter(
        (subject) =>
          subject.titleKey.toLowerCase().includes(normalizedQuery) ||
          subject.typeKey.toLowerCase().includes(normalizedQuery)
      );
    }

    if (filterOptions.groupKey) {
      subjects = subjects.filter((subject) =>
        Object.values(subjectsByInstitution).some((institution) =>
          institution.groups.some(
            (group) =>
              group.groupKey === filterOptions.groupKey &&
              group.subjects?.some((s) => s.id === subject.id)
          )
        )
      );
    }

    return subjects;
  }

  // Validation methods
  isValidInstitution(institutionId: string): boolean {
    return institutions.some((inst) => inst.id === institutionId);
  }

  isValidSubject(institutionId: string, subjectId: string): boolean {
    const result = this.findSubject(institutionId, subjectId);
    return result.subject !== null;
  }
}

export const dataService = new DataService();

// Re-export commonly used types for convenience
export type {
  ExamSubject,
  SubjectFilterOptions,
  SubjectQueryResult,
  SubjectDetailResult,
  StatisticsResult,
  Institution,
};
