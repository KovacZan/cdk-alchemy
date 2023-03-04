import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Built on Top of Alchemy With SDK',
    description: (
      <>
          Our Libraries, built on top of Alchemy with an SDK, provide
          a powerful and efficient building blocks to enhance your blockchain applications development.
      </>
    ),
  },
  {
    title: 'Focused on Developer Experience',
    description: (
      <>
          Our platform prioritizes the developer experience, providing powerful and user-friendly
          tools to build amazing applications quickly and efficiently. With our well defined library and
          comprehensive documentation you can focus on what you do best - building great applications.
      </>
    ),
  },
  {
    title: 'Build With AWS Tech',
    description: (
      <>
          Our platform is built with AWS tech, providing a reliable and scalable cloud infrastructure to build your next project.
          With powerful cloud resources, you can trust that your application
          will be built on a solid and flexible foundation.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
