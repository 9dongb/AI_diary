import Twig from 'twig';

export async function renderTemplate(templateName: string, context: object, container: HTMLElement) {
    const response = await fetch(`./templates/${templateName}`);
    const template = await response.text();
    const rendered = Twig.twig({ data: template }).render(context);
    container.innerHTML = rendered;
}
