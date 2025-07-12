export const CATEGORY_LABELS: Record<string, string> = {
    CONCERT: "Concert",
    SEMINAR: "Seminar",
    WORKSHOP: "Workshop",
    SPORTS: "Sports",
    THEATRE: "Theatre",
    WELLENSS: "Wellness",
    KIDS: "Kids",
    EDUCATION: "Education",
};

export function getCategoryLabel(category: string): string {
    return CATEGORY_LABELS[category] || category;
}