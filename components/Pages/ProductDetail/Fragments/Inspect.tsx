import { ReactNode } from 'react';
import styled from 'styled-components';

import { ProductFileFormat } from 'constants/product.constant';

import { ProductModel } from 'models/product.model';

import { maxMedia } from 'styles/__media';
import Icon from 'components/Fragments/Icons';

const listInfo: {
  title: string;
  key?:
    | 'file_details'
    | 'geometry'
    | 'vertices'
    | 'textures'
    | 'materials'
    | 'is_uv'
    | 'is_pbr'
    | 'is_animated'
    | 'is_rigged';
  type: 'normal' | 'list' | 'import-in' | 'y/n';
  value?: ReactNode;
}[] = [
  { title: 'License', type: 'normal', value: 'Standard' },
  { title: 'Included 3D formats', key: 'file_details', type: 'list' },
  {
    title: 'Import in',
    type: 'import-in',
    value: (
      <div className='import-in d-flex align-items-center'>
        <Icon iconName='blender' />
        <Icon iconName='cinema4d' />
        <Icon iconName='unity' />
        <Icon iconName='unreal-engine' />
      </div>
    ),
  },
  { title: 'Geometry', key: 'geometry', type: 'list' },
  { title: 'Vertices', key: 'vertices', type: 'normal' },
  { title: 'Textures', key: 'textures', type: 'normal' },
  { title: 'Materials', key: 'materials', type: 'normal' },
  { title: 'UV Layers', key: 'is_uv', type: 'y/n' },
  { title: 'PBR', key: 'is_pbr', type: 'y/n' },
  { title: 'Animation', key: 'is_animated', type: 'y/n' },
  { title: 'Rigged', key: 'is_rigged', type: 'y/n' },
];

const ProductDetailInspect = ({ data }: { data: ProductModel }) => {
  return (
    <Inspect__Wrapper>
      <h3 className='Product__Inspect__Title'>Inspect the 3d models</h3>

      <div className='Product__Inspect__Content'>
        {listInfo.map((item, index) => {
          return (
            <div className='Product__Inspect__Item' key={index}>
              <label className='Product__Inspect__Item_Title'>{item.title}</label>
              <div className='Product__Inspect__Item_Value text-right'>
                {!item.key && item.value}
                {item.type === 'normal' && item.key && (
                  <span dangerouslySetInnerHTML={{ __html: data[item.key]?.toString() || '' }} />
                )}
                {item.type === 'y/n' && item.key && (data[item.key] ? 'Yes' : 'No')}
                {item.type === 'list' &&
                  (item.key === 'geometry' ? (
                    <>
                      {data.geometry?.triangles && <p>Triangles {data.geometry.triangles}</p>}
                      {data.geometry?.quads && <p>Quads {data.geometry.quads}</p>}
                      {data.geometry?.total_triangles && (
                        <p>Total triangles {data.geometry.total_triangles}</p>
                      )}
                    </>
                  ) : (
                    ProductFileFormat.filter((i: any) => data.file_details?.includes(i.key))?.map(
                      (file, index) => {
                        return (
                          <p key={index}>
                            {file.title}
                            <span> ({file.key})</span>
                          </p>
                        );
                      }
                    )
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </Inspect__Wrapper>
  );
};

export default ProductDetailInspect;

const Inspect__Wrapper = styled.div`
  grid-area: 2 / 2 / 6 / 3;

  height: fit-content;
  margin-top: 30px;
  border: 1px solid #f0f0f0;

  ${maxMedia.medium} {
    margin: 0 -20px;
    margin-top: 40px;
  }

  .Product__Inspect__Title {
    padding: 15px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-gray-9);
    background-color: var(--color-gray-5);
  }

  .Product__Inspect__Item {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
    background-color: #fafafa;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-line);
    }

    .Product__Inspect__Item_Title {
      font-size: 14px;
      color: var(--text-title);
    }
    .Product__Inspect__Item_Value {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-gray-8);

      .import-in {
        gap: 10px;
        .my-icon {
          height: 20px;
          width: auto;
        }
      }
    }
  }
`;
