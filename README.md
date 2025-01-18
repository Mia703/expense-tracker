This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# My Notes

NextJS & ReactJS -- framework

ChakraUI -- React components

Formik & Yup -- form validation

Xata.io -- database

TailwindCSS -- styling and responsive design

https://nextjs.org/docs/app/building-your-application/routing/redirecting

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages

https://stackoverflow.com/questions/56701337/type-boolean-is-not-assignable-to-type-false

https://www.pluralsight.com/resources/blog/guides/use-interface-props-in-functional-components-using-typescript-with-react

https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le


Preventing Material UI from overwriting TailwindCSS classes

- It's due to the CSS injection order. TailwindCSs comes first and Material UI css comes later and is overwriting all the changes from Tailwind. The way to stop Material UI from overwriting is by inserting `important: "[element-id-here]"` in the `tailwind.config.ts` file with the element id of root element of your `layout.tsx` file. In this case the "root" HTML tag of my file is the `<body>` tag of `layout.tsx` tag.
- The other, and better, option is to use the `StyledEngineProvider` tag from Material UI and tell Material UI to inject their CSS before TailwindCSS.

Reference: https://youtu.be/QQIfuMlA6TI?si=44iA7y2F3GqJqsr0


Using Yup
https://javascript.tutorialink.com/formik-yup-password-strength-validation-with-react/

----
React TypeScript Error

```txt
Type '{ children: Element; title: string; }' is not assignable to type 'IntrinsicAttributes & FormWrapperProps'. Property 'children' does not exist on type 'IntrinsicAttributes & FormWrapperProps'.
```

The error you're encountering suggests that the `FormWrapperProps` interface or type does not include a `children` property. To resolve this issue, you need to ensure that the `FormWrapperProps` type includes the `children` property and any other necessary properties.

Here's an example of how you can define the `FormWrapperProps` type to include the `children` and `title` properties:

```typescript
import React from 'react';

interface FormWrapperProps {
  title: string;
  children: React.ReactNode; // This allows any valid React child
}

const FormWrapper: React.FC<FormWrapperProps> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default FormWrapper;
```

In this example, `FormWrapperProps` includes both `title` and `children` properties. The `children` property is typed as `React.ReactNode`, which allows any valid React child, including elements, strings, numbers, and arrays.

If you are using a different type for `children`, make sure it matches the type of children you are passing to the component. For instance, if you are passing a specific type of React element, you can define it accordingly:

```typescript
interface FormWrapperProps {
  title: string;
  children: React.ReactElement; // This allows a single React element
}
```

Or if you are passing a specific type of component:

```typescript
interface FormWrapperProps {
  title: string;
  children: React.ReactElement<MyCustomComponent>; // This allows a specific type of React element
}
```

Make sure to adjust the type definitions based on your specific requirements and the types of children you intend to pass to the `FormWrapper` component.