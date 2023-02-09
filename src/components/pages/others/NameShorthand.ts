export function nameShorthand(name: string) {
    const shorthand = name.split(' ').slice(0, 2).map((x: string) => x.substring(0, 1)).join('');

    return shorthand
}